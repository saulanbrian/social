from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid

def construct_path(instance,filename):
  return 'users/{0}/profile/{1}'.format(instance.username,filename)

class CustomUser(AbstractUser):
  id = models.UUIDField(default=uuid.uuid4,primary_key=True,editable=False)
  profile_picture = models.ImageField(upload_to=construct_path,null=True)
