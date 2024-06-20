from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .models import Customer
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']


class CustomerSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=50, write_only=True, required=True)
    
    class Meta:
        model = Customer
        fields = ['email', 'first_name', 'last_name', 'phone_number', 'password']
    
    def validate(self, data):
        if len(data['password']) < 6:
            raise ValidationError("Password must be more than 6 characters")

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
            phone_number = validated_data['phone_number']
        )
        return customer
