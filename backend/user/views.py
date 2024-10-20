from django.shortcuts import render
from rest_framework.generics import CreateAPIView  

from .serializers import UserAuthSerializer

class RegisterUserAPIView(CreateAPIView):
  serializer_class = UserAuthSerializer

