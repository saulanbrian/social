from django.db import models
from user.models import CustomUser
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey

class Like(models.Model):
  user = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
  content_type = models.ForeignKey(ContentType,on_delete=models.CASCADE,related_name='likes')
  object_id = models.UUIDField()
  content_object = GenericForeignKey('content_type','object_id')
