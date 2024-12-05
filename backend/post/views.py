from django.shortcuts import get_object_or_404
from rest_framework.generics import ListCreateAPIView, RetrieveAPIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.pagination import PageNumberPagination
from rest_framework.exceptions import PermissionDenied
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Post
from comment.models import Comment
from django.contrib.contenttypes.models import ContentType

from .serializers import PostSerializer
from comment.serializers import CommentSerializer

class PostPagination(PageNumberPagination):
  page_size = 20


class PosListCreateAPIView(ListCreateAPIView):
  serializer_class = PostSerializer
  parser_classes = [MultiPartParser,FormParser]
  pagination_class = PostPagination
  queryset = Post.objects.all().order_by('-date_time_created')
  
  
  def perform_create(self,serializer):
    if not self.request.user.is_authenticated:
      raise PermissionDenied('login required')
    else:
      serializer.save(author=self.request.user)
      
      
  def get_serializer_context(self):
    context = super().get_serializer_context()
    context['request'] = self.request
    return context
  
  
      
class PostRetrieveAPIView(RetrieveAPIView):
  serializer_class = PostSerializer
  queryset = Post.objects.all()
  

@permission_classes([IsAuthenticated])
@api_view(['POST'])
def like_post(request,pk):
  post = get_object_or_404(Post.objects.prefetch_related('likes'),pk=pk)
  post.likes.add(request.user)
  serializer = PostSerializer(post,context={'request':request})
  return Response(serializer.data,status=status.HTTP_200_OK)


@permission_classes([IsAuthenticated])
@api_view(['POST'])
def unlike_post(request,pk):
  post = get_object_or_404(Post,pk=pk)
  post.likes.remove(request.user)
  serializer = PostSerializer(post)
  return Response(serializer.data,status=status.HTTP_200_OK)


@permission_classes([IsAuthenticated])
@api_view(['POST'])
def add_comment(request,pk):
  post = get_object_or_404(Post,pk=pk)
  serializer = CommentSerializer(data=request.data)
  if serializer.is_valid():
    serializer.save(
      post=post,
      author=request.user
    )
    return Response(serializer.data,status=status.HTTP_201_CREATED)
  return Response(serializer.errors,status=status.HTTTP_400_BAD_REQUEST)