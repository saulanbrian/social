from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid

def construct_path(instance,filename):
  return 'users/{0}/profile/{1}'.format(instance.username,filename)

def construct_background_path(instance,filename):
  return 'users/{0}/backrgound_photo/{1}'.format(instance.id,filename)

class CustomUser(AbstractUser):
  id = models.UUIDField(default=uuid.uuid4,primary_key=True,editable=False)
  profile_picture = models.ImageField(upload_to=construct_path,null=True)
  bio = models.TextField(max_length=200,null=True)
  followers = models.ManyToManyField('self')
  following = models.ManyToManyField('self')
  background_photo = models.ImageField(upload_to=construct_background_path,null=True)
