from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_200_OK
from rest_framework.pagination import PageNumberPagination, InvalidPage

from user.serializers import UserSerializer
from post.serializers import PostSerializer

from user.models import CustomUser as User
from post.models import Post

class SearchPagination(PageNumberPagination):
  page_size = 3

class SearchAPIView(APIView):
  
  def get(self,request):
    search_key = self.request.query_params.get('q',None)
    
    if not search_key:
      return Response({'error':'a search key is required'},status=HTTP_400_BAD_REQUEST)

    user_paginator = SearchPagination()
    post_paginator = SearchPagination()
    
    users = User.objects.filter(username__icontains=search_key)
    try:
      paginated_users = user_paginator.paginate_queryset(users,request=request)
      user_list = UserSerializer(paginated_users,many=True).data
    except InvalidPage:
      user_list = []
    
    posts = Post.objects.filter(caption__icontains=search_key)
    try:
      paginated_posts = post_paginator.paginate_queryset(posts,request=request)
      post_list = PostSerializer(paginated_posts,many=True).data
    except InvalidPage:
      post_list = []
    
    return Response({
      'users':{
        'count':user_paginator.page.paginator.count,
        'next':user_paginator.get_next_link(),
        'previous':user_paginator.get_previous_link(),
        'results':user_list
      },
      'posts':{
        'count':post_paginator.page.paginator.count,
        'next':post_paginator.get_next_link(),
        'previous':post_paginator.get_previous_link(),
        'results':post_list
      }
    }, status=HTTP_200_OK)