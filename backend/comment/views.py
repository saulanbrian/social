from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView
from rest_framework.exceptions import PermissionDenied
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status


from .serializers import CommentSerializer
from .models import Comment
from post.models import Post

class CommentPagination(PageNumberPagination):
  page_size = 10


class CommentListAPIView(ListAPIView):
  serializer_class = CommentSerializer
  pagination_class = CommentPagination
  
  def get_queryset(self):
    post_id = self.request.query_params.get('post')
    post = get_object_or_404(Post.objects.prefetch_related('comments'),pk=post_id)
    return post.comments.all().order_by('-date_time_created')
    
  
class CommentRetrieveAPIView(RetrieveAPIView):
  serializer_class = CommentSerializer
  lookup_field = 'pk'
  queryset = Comment.objects.all()
  
  def get_serializer_context(self):
    context = super().get_serializer_context()
    context['include_post'] = True
    return context
  