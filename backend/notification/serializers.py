from rest_framework import serializers

from .models import Notification 

class NotificationSerializer(serializers.ModelSerializer):
  
  actor_profile = serializers.SerializerMethodField()
  actor_username = serializers.SerializerMethodField()
  actor_id = serializers.SerializerMethodField()
  target_type = serializers.SerializerMethodField()
  
  class Meta:
    model = Notification
    fields = (
      'id',
      'notification_type',
      'target_type',
      'target_id',
      'message',
      'date_time_created',
      'actor_id',
      'actor_username',
      'actor_profile'
    )
    
  def get_actor_id(self,obj):
    return obj.actor.id
    
  def get_actor_profile(self,obj):
    return obj.actor.profile_picture.url
    
  def get_actor_username(self,obj):
    return obj.actor.username
    
  def get_target_type(self,obj):
    return str(obj.target_type.model)