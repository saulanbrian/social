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
  
  is_read = models.BooleanField(default=False)
  
  date_time_created = models.DateTimeField(auto_now_add=True)
  
  def mark_as_read(self):
    self.is_read = True
    self.save()

