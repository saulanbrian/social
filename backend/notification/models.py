from django.db import models

from user.models import CustomUser

class Notification(models.Model):
  type = models.CharField(
    choices=(
      ('like','Like'),
      ('comment','Comment')
    ),
    max_length=10
  )
  message = models.TextField()
  receiver = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
  