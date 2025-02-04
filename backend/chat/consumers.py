from channels.generic.websocket import AsyncWebsocketConsumer
import json
from channels.db import database_sync_to_async

from .models import Chat, Conversation
from .serializers import ChatSerializer

class ChatConsumer(AsyncWebsocketConsumer):
  
  async def connect(self):
    self.user = self.scope['user']

    if not self.user or not self.user.is_authenticated:
        await self.close()
        return
      
    convo_id = self.scope['url_route']['kwargs'].get('pk')
    self.conversation = await self.get_conversation(convo_id)
    
    if not self.conversation:
      self.close()
      
    self.room_group_name = f'conversation_{convo_id}'
      
    await self.channel_layer.group_add(
        self.room_group_name,
        self.channel_name
    )
      
    await self.accept()

  async def receive(self, text_data=None, bytes_data=None):
      
    data = json.loads(text_data)
    chat = await self.save_message(data['message'])
    
    await self.channel_layer.group_send(
      self.room_group_name,
      { 
        'type':'chat_message',
        'chat':chat
      }
    )
      
  async def chat_message(self,event):
    chat = event['chat']
    sender = chat['sender']
    await self.send(text_data=json.dumps({
      **chat,
      'id':str(chat['id']),
      'sender':{
        **sender,
        'id':str(sender['id'])
      }
    }))
    
  async def disconnect(self, code):
    return await super().disconnect(code)
  
  @database_sync_to_async
  def save_message(self,text):
    chat = Chat.objects.create(
      message=text,
      sender=self.user,
      conversation=self.conversation
    )
    serializer = ChatSerializer(chat)
    return serializer.data
      
  @database_sync_to_async
  def get_conversation(self,convo_id):
    try:
      conversation = Conversation.objects.get(pk=convo_id)
    except Conversation.DoesNotExist:
      return None
    else:
      return conversation