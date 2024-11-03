from django.db import models
from django.contrib.auth.models import AbstractUser


def construct_path(instance,filename):
  return 'users/{0}/profile/{1}'.format(instance.username,filename)

class CustomUser(AbstractUser):
  profile_picture = models.ImageField(upload_to=construct_path,null=True)
