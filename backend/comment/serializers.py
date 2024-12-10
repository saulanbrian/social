from rest_framework import serializers 

from .models import Comment

class CommentSerializer(serializers.ModelSerializer):
  
  author_profile = serializers.SerializerMethodField()
  author_id = serializers.SerializerMethodField()
  author_username = serializers.SerializerMethodField()
  post_id = serializers.SerializerMethodField()
  
  class Meta:
    model = Comment 
    fields = (
      'id',
      'text',
      'author_profile',
      'author_username',
      'post_id',
      'author_id')
    extra_kwargs = {
      'author_username':{
        'read_only':True
      },
      'author_profile':{
        'read_only':True
      }
    }
    
    
  def get_author_profile(self,obj):
    return obj.author.profile_picture.url
    
  def get_author_username(self,obj):
    return obj.author.username
    
  def get_author_id(self,obj):
    return obj.author.id
    
  def get_post_id(self,obj):
    include_post = self.context.get('include_post')
    if include_post:
      return obj.post.id
    return None
  
  def to_repesentation(self,instance):
    representation = super().to_repesentation(instance)
    if not self.context.get('include_post'):
      representation.pop('post_id')
    return representation