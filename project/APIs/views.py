from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import (
    CustomerSerializer, 
    MyTokenObtainPairSerializer
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
    permission_classes = (IsAuthenticated,) 
    
    def post(self, request, *args, **kwargs):
        return Response({"data": "OK"}, status=status.HTTP_200_OK)


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


register_view = RegisterUserAPIView.as_view()
login_view = LoginUserAPIView.as_view()
update_user_view = UpdateUserAPIView.as_view()
page404_view = PageNotFoundAPIView.as_view()