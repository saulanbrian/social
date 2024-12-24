from rest_framework import serializers 

from .models import Post

class PostSerializer(serializers.ModelSerializer):
  
  author_id = serializers.SerializerMethodField()
  author_username = serializers.SerializerMethodField()
  author_profile = serializers.SerializerMethodField()
  is_liked = serializers.SerializerMethodField()
  
  class Meta:
    model = Post 
    fields = ('id','author_username','author_profile','caption','image','is_liked','author_id')
    
    
  def get_author_id(self,obj):
    return obj.author.id

  def get_author_profile(self,obj):
    return obj.author.profile_picture.url if obj.author.profile_picture else None
    
  def get_author_username(self,obj):
    return obj.author.username
    
  def get_is_liked(self,obj):
    request = self.context.get('request', None)
    if request and request.user.is_authenticated:
      return obj.likes.filter(id=request.user.id).exists()
    return False
  
  
class PostImageSerializer(serializers.ModelSerializer):
  
  post_id = serializers.SerializerMethodField()
  
  class Meta:
    model = Post
    fields = ('post_id','image')
    
  def get_post_id(self,obj):
    return obj.id