from django.contrib.auth.models import User
from rest_framework import serializers
from . models import Apps,TaskImage
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password", "is_staff"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        is_staff = validated_data.pop('is_staff', False)
        user = User.objects.create_user(**validated_data)
        user.is_staff = is_staff
        user.save()
        return user

class AppSerializer(serializers.ModelSerializer):
    class Meta:
        model = Apps
        fields = '__all__'

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskImage
        fields = '__all__'

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)  # Get the original token data

        # Add custom fields
        data['is_staff'] = self.user.is_staff
        data['username'] = self.user.username
        return data
