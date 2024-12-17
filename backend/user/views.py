from django.shortcuts import get_object_or_404
from rest_framework.generics import CreateAPIView, UpdateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, JSONParser, FormParser

from .serializers import AuthUserSerializer, UserSerializer

from .models import CustomUser

class UserCreateAPIView(CreateAPIView):
  serializer_class = AuthUserSerializer


class UserUpdateView(UpdateAPIView):
  serializer_class = UserSerializer
  permission_classes = [IsAuthenticated]
  parser_classes = [MultiPartParser,FormParser]
  lookup_field = 'pk'

  def get_queryset(self):
    user_id = self.request.user.id
    return CustomUser.objects.filter(id=self.request.user.id)
  

class UserRetrieveAPIView(RetrieveAPIView):
  serializer_class = UserSerializer
  lookup_field = 'pk'
  queryset = CustomUser.objects.all() 
  

  