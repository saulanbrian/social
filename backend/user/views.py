from django.shortcuts import get_object_or_404
from rest_framework.generics import CreateAPIView, UpdateAPIView, RetrieveAPIView, ListCreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, JSONParser, FormParser
from rest_framework.pagination import PageNumberPagination
from rest_framework.exceptions import NotFound

from post.serializers import PostSerializer, PostImageSerializer
from .serializers import AuthUserSerializer, UserSerializer

from post.models import Post
from .models import CustomUser


class Pagination(PageNumberPagination):
  page_size = 10
  
class SearchPagination(PageNumberPagination):
  page_size = 20
  

class UserCreateAPIView(CreateAPIView):
  serializer_class = AuthUserSerializer


class UserSearchList(ListAPIView):
  serializer_class = UserSerializer
  pagination_class = SearchPagination
  
  def get_queryset(self):
    search_param = self.request.query_params.get('q',None)
    user_id = self.request.user.id if self.request.user and self.request.user.is_authenticated else None
    if not search_param:
      raise NotFound(detail='a search key is required')
    return CustomUser.objects.filter(username__icontains=search_param).exclude(id=user_id)
  

  def get_serializer_context(self):
    context = super().get_serializer_context()
    if self.request and self.request.user.is_authenticated:
      context['show_if_followed'] = True
      context['user_id'] = self.request.user.id 
    return context

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
  
  def get_serializer_context(self):
    context = super().get_serializer_context()
    if self.request and self.request.user.is_authenticated:
      context['show_if_followed'] = True
      context['user_id'] = self.request.user.id
    return context


class UserPostListCreateAPIView(ListAPIView):
  serializer_class = PostSerializer 
  pagination_class = Pagination
  
  def get_queryset(self):
    user_id = self.kwargs.get('pk')
    return Post.objects.filter(author__id=user_id).order_by('-date_time_created')
  

class UserImageListAPIView(ListAPIView):
  serializer_class = PostImageSerializer
  pagination_class = Pagination
  
  def get_queryset(self):
    user_id = self.kwargs.get('pk')
    return Post.objects.filter(author__id=user_id).exclude(image__isnull=True).exclude(image__exact='')
  
  
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def follow_user(request,pk):
  user = get_object_or_404(CustomUser, pk=pk)
  user.followers.add(request.user)
  serializer = UserSerializer(user)
  return Response(data=serializer.data)


@permission_classes([IsAuthenticated])
@api_view(['POST'])
def unfollow_user(request,pk):
  user = get_object_or_404(CustomUser, pk=pk)
  user.followers.remove(request.user)
  serializer = UserSerializer(user)
  return Response(data=serializer.data)


@permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_current_user(request):
  user = get_object_or_404(CustomUser,pk=request.user.id)
  serializer = UserSerializer(user)
  return Response(serializer.data)

class UserFollowingListAPIView(ListAPIView):
  serializer_class = UserSerializer
  pagination_class = Pagination
  
  def get_queryset(self):
    id_as_params = self.request.query_params.get('user_id',None)
    if not id_as_params:
      user_id = self.request.user.id
      user = get_object_or_404(CustomUser,pk=user_id)
      return user.following.all()
    else:
      user = get_object_or_404(CustomUser,pk=id_as_params)
      return user.following.all()
  