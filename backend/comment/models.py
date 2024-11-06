from django.db import models
import uuid 

from user.models import CustomUser as User
from post.models import Post

def construct_path(instance,filename):
  return 'users/{0}/comments/{1}'.format(instance.author.username,filename)

class Comment(models.Model):
  id = models.UUIDField(primary_key=True,editable=False,unique=True,default=uuid.uuid4)
  text = models.CharField(max_length=400)
  author = models.ForeignKey(User,on_delete=models.CASCADE,related_name='comments')
  post = models.ForeignKey(Post,on_delete=models.CASCADE,related_name='comments')
  