from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.generics import ListCreateAPIView
from rest_framework.exceptions import PermissionDenied
from rest_framework.pagination import PageNumberPagination


from .serializers import CommentSerializer
from .models import Comment


class CommentPagination(PageNumberPagination):
  page_size = 10


class CommentListCreateAPIView(ListCreateAPIView):
  serializer_class = CommentSerializer
  pagination_class = CommentPagination
  queryset = Comment.objects.all()
  
  # def perform_create(self,serializer):
#     if not self.request.user.is_authenticated:
#       raise PermissionDenied('login first')
#     else:
#       serializer.save(author=self.request.user)