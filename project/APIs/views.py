from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth import update_session_auth_hash
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import (
    MyTokenObtainPairSerializer,
    CustomerSerializer, 
    UpdatePasswordSerializer,
    UpdateProfileSerializer,
)
from rest_framework_simplejwt.views import TokenObtainPairView

# # Create your views here.
class LoginUserAPIView(TokenObtainPairView):
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        # print(request.data)
        serializer  = self.get_serializer(data=request.data)

        if serializer.is_valid():
            print('valid')
            # print(serializer.data)
            # print(serializer)
            user = serializer.user
            tokens = serializer.validated_data
            print(user)

            data = {
                'user': {
                    'id':user.id,
                    'email':user.username,
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
            user = request.user
            user.first_name = serializer.validated_data.get('first_name')
            user.last_name = serializer.validated_data.get('last_name')
            user.phone_number = serializer.validated_data.get('phone_number')
            user.save()
            # return response OK
            return Response(serializer.data, status=status.HTTP_200_OK)
        # Invalidated data
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


        # return Response({"data": f"{user.username} used their {token.payload.get('token_type')} token"}, status=status.HTTP_200_OK)


class PageNotFoundAPIView(APIView):
    pass
    # def post(self):
        # return Response(status=status.HTTP_404_NOT_FOUND)

class RegisterUserAPIView(APIView):
    def post(self, request, *args, **kwargs):
        # print('request',request.data)
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            user = User.objects.get(username=serializer.data.get('email'))
            
            user = {
                "id":user.id,
                "fullname": f"{serializer.data.get('first_name')} {serializer.data.get('last_name')}",
                "email": serializer.data.get('email')
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
                return Response({"data":"Password updated successfully"}, status=status.HTTP_200_OK)
            return Response({"data": "Incorrect old password"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




register_view = RegisterUserAPIView.as_view()
login_view = LoginUserAPIView.as_view()
update_user_view = UpdateUserAPIView.as_view()
update_password_view = UpdateUserPasswordAPIView.as_view()
page404_view = PageNotFoundAPIView.as_view()