from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth import update_session_auth_hash
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated

from .models import Post, Customer
from .serializers import (
    MyTokenObtainPairSerializer,
    CustomerSerializer, 
    UpdatePasswordSerializer,
    UpdateProfileSerializer,
    UpdateProfilePictureSerializer,
    CreatePostSerializer,
    UpdatePostSerializer,
)
from rest_framework_simplejwt.views import TokenObtainPairView

# # Create your views here.
class LoginUserAPIView(TokenObtainPairView):
    # permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        # print(request.data)
        serializer  = self.get_serializer(data=request.data)

        if serializer.is_valid():
            print('valid')
            # print(serializer.data)
            # print(serializer)
            user = serializer.user
            tokens = serializer.validated_data
            customer = Customer.objects.get(user=user)
            print(user)

            data = {
                'user': {
                    'id':user.id,
                    'email':user.username,
                    'fullname': f'{customer.first_name} {customer.last_name}',
                    'image': f'{str(customer.image.url).replace("http", "https")}'
                },
                'refresh': str(tokens.get('refresh')),
                'access': str(tokens.get('access'))
            }

            return Response(data, status=status.HTTP_200_OK) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
        

class UpdateUserAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = UpdateProfileSerializer(data=request.data)
        if serializer.is_valid():
            print(request.user)
            customer = Customer.objects.get(user=request.user)
            if customer:
                customer.first_name = serializer.validated_data.get('first_name')
                customer.last_name = serializer.validated_data.get('last_name')
                customer.phone_number = serializer.validated_data.get('phone_number')
                customer.save()
                # return response OK
                return Response({"data":"user profile updated successfully"}, status=status.HTTP_202_ACCEPTED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)   
        # Invalidated data
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


        # return Response({"data": f"{user.username} used their {token.payload.get('token_type')} token"}, status=status.HTTP_200_OK)


class PageNotFoundAPIView(APIView):
    pass
    # def post(self):
        # return Response(status=status.HTTP_404_NOT_FOUND)

class RegisterUserAPIView(APIView):
    def post(self, request, *args, **kwargs):
        print('request',request.data)
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            user = User.objects.get(username=serializer.data.get('email'))
            image = str(Customer.objects.get(user=user).image.url).replace('http', 'https')
            
            user = {
                "id":user.id,
                "fullname": f"{serializer.data.get('first_name')} {serializer.data.get('last_name')}",
                "email": serializer.data.get('email'), 
                "image": image
            }

            return Response(user, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateUserPasswordAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = UpdatePasswordSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user 
            if user.check_password(serializer.validated_data.get('old_password')):
                user.set_password(serializer.validated_data.get('new_password'))
                user.save()
                update_session_auth_hash(request, user)
                return Response({"data":"Password updated successfully"}, status=status.HTTP_202_ACCEPTED)
            return Response({"data": "Incorrect old password"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateProfilePictureAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        try:
            user = Customer.objects.get(user=User.objects.get(id=4))

            # data = {
            #     'image':'https://res.cloudinary.com/dkzk3c8rt/image/upload/v1719173491/tlpahhl7yu2ur0zqpgjt.png'
            # }
            
            serializer = UpdateProfilePictureSerializer(instance=user, data=request.data)
            if serializer.is_valid():
                serializer.save()
                # return only the image url
                data = serializer.data
                data['image'] = f"https:{''.join(data.get('image').split(':')[1:])}"
                return Response(data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"Error": str(e).strip()}, status=status.HTTP_400_BAD_REQUEST)


class CreatePostAPIView(APIView):
    # permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        # valid user -> request.user
        user = get_object_or_404(User, id=4)
        serializer = CreatePostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class UpdatePostAPIView(APIView):
    # permission_classes = [IsAuthenticated]

    def post(self, request, id, *args, **kwargs):
        # replace with request.user.id
        user = get_object_or_404(User,id=4)

        # Post id is a parameterized variable
        post_obj = get_object_or_404(Post, id=id)

        # validate Post author 
        if post_obj.author != user:
            return Response({"Error": "Only the Post author can update their post."}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = UpdatePostSerializer(post_obj, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class AllPostsAPIView(APIView):
    def get(self, *args, **kwargs):
        Posts = Post.objects.all().order_by('-updated_at')
        serializer = CreatePostSerializer(Posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UserPostAPIView(APIView):
    # permission_classes = (IsAuthenticated,)
    def get(self, request, id, *args, **kwargs):
        print(id)
        customer = get_object_or_404(Customer, id=id)
        if customer:
            user_posts = Post.objects.filter(author=customer.user)
            serializer = CreatePostSerializer(user_posts, many=True)
            print(serializer.data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)
        

class DeletePostAPIView(APIView):
    def delete(self, request, id, *args,**kwargs):
        # replace with request.user.id
        user = get_object_or_404(User, id=4)

        # id is passed as a parameterized query
        post_obj = get_object_or_404(Post, id=id)

        # validate Post author
        if post_obj.author != user:
            return Response({"Error": "Only the Post author can delete their post."}, status=status.HTTP_403_FORBIDDEN)
        
        post_obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



register_view = RegisterUserAPIView.as_view()
login_view = LoginUserAPIView.as_view()
update_user_view = UpdateUserAPIView.as_view()
update_password_view = UpdateUserPasswordAPIView.as_view()
update_profile_picture = UpdateProfilePictureAPIView.as_view()
create_post_view = CreatePostAPIView.as_view()
update_post_view = UpdatePostAPIView.as_view()
delete_post_view = DeletePostAPIView.as_view()
user_posts_view = UserPostAPIView.as_view()
all_posts_view = AllPostsAPIView.as_view()
page404_view = PageNotFoundAPIView.as_view()