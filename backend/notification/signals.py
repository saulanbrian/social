from django.dispatch import receiver 
from django.db.models.signals import pre_save

from post.models import Post
from notification.models import Notification

