from channels.generic.websocket import AsyncWebsocketConsumer
import json 


class NotificationConsumer(AsyncWebsocketConsumer):
  
  async def connect(self):
    
    user = self.scope["user"]
    
    if not user.is_authenticated:
      await self.close(code=4001)
      return 
    
    self.room_group_name = f'user_{user.id}_notification'
    
    await self.channel_layer.group_add(
      self.room_group_name,
      self.channel_name
    )
    
    await self.accept()
    
    
  async def send_notification(self,event):
    message = event['message']
    await self.send(text_data=json.dumps({
      'message':message
    }))
    