from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
# Create your views here.


class RegisterUserAPIView(APIView):
    def post(self, request, *args, **kwargs):
        return Response({"user": "user created"}, status=status.HTTP_201_CREATED)

class LoginUserAPIView(APIView):
    def post(self, request, *args, **kwargs):
        return Response({"user":"login successfull"}, status=status.HTTP_200_OK)



register_view = RegisterUserAPIView.as_view()
login_View = LoginUserAPIView.as_view()