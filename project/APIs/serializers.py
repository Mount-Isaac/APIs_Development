from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .models import (
    CustomUser, 
    Client,
)
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'first_name', 'last_name', 'password')
        # fields = "__all__"
        extra_kwargs = {"password": {"write_only":True}}


    def validate(self, data):
        # print(data, 'in validate')
        if len(data['password']) < 6:
            raise ValidationError("Password too short")
        return data
    
    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            email = validated_data['email'],
            password = validated_data['password'],
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name']
        )
        return user


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ('phone_number', 'address')
    


class RegisterSerializer(serializers.Serializer):
    user = UserSerializer()
    client = ClientSerializer()

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        client_data = validated_data.pop('client')

        user = UserSerializer().create(user_data)
        client = Client.objects.create(user=user, **client_data)

        return {"user":user, "client":client}
    


class CustomUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True)


    class Meta:
        model = CustomUser
        fields = ('email', 'password')
    
    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        print(email, password)

        user = authenticate(request=self.context.get('request'), email=email, password=password)
        print('user', user)
        if not user:
            raise serializers.ValidationError('Invalid email or password')
        
        attrs['user'] = user
        return attrs