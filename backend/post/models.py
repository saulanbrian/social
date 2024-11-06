from django.db import models
import uuid

from user.models import CustomUser

def construct_path(instance,filename):
  return 'users/{0}/posts_images/{1}'.format(instance.author.username,filename)

class Post(models.Model):
  id = models.UUIDField(primary_key=True,editable=False,unique=True,default=uuid.uuid4)
  author = models.ForeignKey(CustomUser,on_delete=models.CASCADE,related_name='posts')
  caption = models.CharField(max_length=1000)
  image = models.ImageField(upload_to=construct_path,null=True)