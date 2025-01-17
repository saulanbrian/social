from django.db import models
import uuid

from user.models import CustomUser as User


class Conversation(models.Model):
  id = models.UUIDField(default=uuid.uuid4,primary_key=True,unique=True,editable=False)
  participants = models.ManyToManyField(User,related_name='conversations')
  

class Chat(models.Model):
  id = models.UUIDField(default=uuid.uuid4,primary_key=True,editable=False,unique=True)
  message = models.TextField(max_length=1000)
  sender = models.ForeignKey(User,related_name='sent_messages',on_delete=models.CASCADE)
  timestamp = models.DateTimeField(auto_now_add=True)
  is_read = models.BooleanField(default=False)
  conversation = models.ForeignKey(Conversation,related_name='messages',on_delete=models.CASCADE)
  
  def mark_as_read(self):
    self.is_read = True
    self.save()