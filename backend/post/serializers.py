from rest_framework import serializers 

from .models import Post

class PostSerializer(serializers.ModelSerializer):
  
  author_username = serializers.SerializerMethodField()
  author_profile = serializers.SerializerMethodField()
  
  class Meta:
    model = Post 
    fields = ('id','author_username','author_profile','caption','image')
    
    
  def get_author_profile(self,obj):
    return obj.author.profile_picture.url
    
  def get_author_username(self,obj):
    return obj.author.username