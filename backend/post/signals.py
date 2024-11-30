from django.dispatch import receiver 
from django.db.models.signals import pre_save, m2m_changed

from .models import Post
from notification.models import Notification
from user.models import CustomUser
from django.contrib.contenttypes.models import ContentType

@receiver(m2m_changed,sender=Post.likes.through)
def handle_notification(sender,action,pk_set,instance,**kwargs):
  
  if action == 'post_add':
    post = Post.objects.get(pk=instance.pk)
    for pk in pk_set:
      user = CustomUser.objects.get(pk=pk)

      Notification.objects.create(
        message=f'{user.username} liked your post',
        receiver=post.author,
        target=post,
        actor=user,
        notification_type='like'
      )
      
  elif action == 'post_remove':
    post_notifications = Notification.objects.filter(
      target_type=ContentType.objects.get_for_model(Post),
      target_id=instance.pk
    )
    for notification in post_notifications:
      if notification.actor.id in pk_set:
        notification.delete()
      
      