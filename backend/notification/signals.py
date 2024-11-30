from django.dispatch import receiver 
from django.db.models.signals import pre_save, post_save

from post.models import Post
from notification.models import Notification

from channels.layers import get_channel_layer 
from asgiref.sync import async_to_sync

from .serializers import NotificationSerializer
import json

@receiver(post_save,sender=Notification)
def push_notification(sender,instance,created,**kwargs):
  
  if created:
    channel_layer = get_channel_layer()
    
    serializer = NotificationSerializer(instance)
    
    async_to_sync(channel_layer.group_send)(
      f'user_{instance.receiver.id}_channel',
      {
        'type':'send.notification',
        'data':serializer.data
      }
    )