from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .models import Post, Customer
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']

class CustomerSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=50, write_only=True, required=True)
    
    class Meta:
        model = Customer
        fields = ['email', 'first_name', 'last_name', 'phone_number', 'password', 'image']
    
    def validate(self, data):
        if len(data['password']) < 8:
            raise ValidationError({"Password": ["Password must be more than 6 characters"]})

        # print('validated data', data)
        return data
    
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data.get('email'),
            password = validated_data.get('password')
        )
        customer = Customer.objects.create(
            user=user,
            email = validated_data['email'],
            first_name=validated_data['first_name'],
            last_name = validated_data['last_name'],
            phone_number = validated_data['phone_number'],
            image = validated_data['image']
        )
        return customer
    


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # add custom claims 
        token['username'] = user.username
        
        return token


class UpdatePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_new_password(self, value):
        if len(value) < 8:
            raise ValidationError("Your password must contain at least 8 characters")
        
        return value

class UpdateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['first_name', 'last_name', 'phone_number']
    
    # def validiated_data(self, validated_data):


class UpdateProfilePictureSerializer(serializers.ModelSerializer):
    # image_url = serializers.SerializerMethodField()

    class Meta:
        model = Customer
        fields = ['image']


class CreatePostSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()
    total_likes = serializers.IntegerField()
    total_dislikes = serializers.IntegerField()

    class Meta:
        model = Post 
        fields = ['id', 'author', 'title', 'content', 'total_likes', 'total_dislikes', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def get_author(self, obj):
        customer = Customer.objects.get(user=obj.author)
        customer_dict =  CustomerSerializer(customer).data
        first_name = customer_dict.get('first_name')
        last_name = customer_dict.get('last_name')
        return f'{first_name} {last_name}'



class UpdatePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'author', 'title', 'content', 'updated_at']
        read_only_fields = ['id', 'updated_at']
    
