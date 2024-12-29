
from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializer import UserSerializer, AppSerializer, CustomTokenObtainPairSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Apps
from rest_framework_simplejwt.views import TokenObtainPairView


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class AppsListCreateView(generics.ListCreateAPIView):
    queryset = Apps.objects.all()
    serializer_class = AppSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Apps.objects.all()

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)


class AppsDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Apps.objects.all()
    serializer_class = AppSerializer

    
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer