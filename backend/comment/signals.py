from django.dispatch import receiver 
from django.db.models.signals import post_save, post_delete, pre_delete

from .models import Comment
from notification.models import Notification
from django.contrib.contenttypes.models import ContentType
from post.models import Post

@receiver(post_save,sender=Comment)
def notify_author(sender,instance,created,**kwargs):
  post = instance.post
  if created and instance.author != post.author:
    Notification.objects.create(
      notification_type='comment',
      target=instance,
      receiver=post.author,
      actor=instance.author,
      message=f'{instance.author.username} commented on your post'
    )
    

@receiver(pre_delete,sender=Comment)
def delete_notification(sender,instance,**kwargs):
  try:
    comment_notification = Notification.objects.get(
      target_type=ContentType.objects.get_for_model(Comment),
      notification_type='comment',
      target_id=instance.id
    )
  except Notification.DoesNotExist:
    pass
  else:
    comment_notification.delete()