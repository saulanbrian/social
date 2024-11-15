from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveAPIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.pagination import PageNumberPagination
from rest_framework.exceptions import PermissionDenied

from .models import Post
from .serializers import PostSerializer


class PostPagination(PageNumberPagination):
  page_size = 20


class PosListCreateAPIView(ListCreateAPIView):
  serializer_class = PostSerializer
  parser_classes = [MultiPartParser,FormParser]
  pagination_class = PostPagination
  queryset = Post.objects.all().order_by('author__id')
  
  
  def perform_create(self,serializer):
    if not self.request.user.is_authenticated:
      raise PermissionDenied('login required')
    else:
      serializer.save(author=self.request.user)
      
      
class PostRetrieveAPIView(RetrieveAPIView):
  serializer_class = PostSerializer
  queryset = Post.objects.all()