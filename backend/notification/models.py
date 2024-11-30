from django.db import models


from user.models import CustomUser
from post.models import Post
from django.contrib.contenttypes.models import ContentType 
from django.contrib.contenttypes.fields import GenericForeignKey


class Notification(models.Model):
  
  type_choices = [
    ('like','like'),
    ('comment','comment')
  ]
  
  notification_type = models.CharField(
    max_length=20,
    choices=type_choices
  )
  
  target_type = models.ForeignKey(
    ContentType,
    on_delete=models.CASCADE
  )
    
  target_id = models.UUIDField()
  
  target = GenericForeignKey(
    'target_type',
    'target_id'
  )
  
  message = models.TextField()
  receiver = models.ForeignKey(
    CustomUser,
    related_name='notifications',
    on_delete=models.CASCADE
  )
  
  actor = models.ForeignKey(
    CustomUser,
    related_name='notified_actions',
    on_delete=models.CASCADE
  )
  




# class PostNotification(models.Model):
#   message = models.TextField()
#   receiver = models.ForeignKey(CustomUser, on_delete=models.CASCADE,related_name='post_notifications')
#   post = models.ForeignKey(Post,related_name='post_notifications',on_delete=models.CASCADE)