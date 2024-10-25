from django.shortcuts import render
from rest_framework.generics import CreateAPIView

from .serializers import AuthUserSerializer

class UserCreateAPIView(CreateAPIView):
  serializer_class = AuthUserSerializer
