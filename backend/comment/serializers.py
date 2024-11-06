from rest_framework import serializers 

from .models import Comment

class CommentSerializer(serializers.ModelSerializer):
  
  author_profile = serializers.SerializerMethodField()
  author_username = serializers.SerializerMethodField()
  
  class Meta:
    model = Comment 
    fields = ('id','text','author_profile','author_username')
    
    
  def get_author_profile(self,obj):
    return obj.author.profile_picture.url
    
  def get_author_username(self,obj):
    return obj.author.username
    