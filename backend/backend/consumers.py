from channels.generic.websocket import AsyncWebsocketConsumer
import json 

class MainConsumer(AsyncWebsocketConsumer):
  
  async def connect(self):
    
    user = self.scope['user']
    
    self.room_group_name = f'user_{user.id}_channel'
    
    if not user.is_authenticated:
      await self.close(code=4001)
      
    await self.channel_layer.group_add(
      self.room_group_name,
      self.channel_name
    )
    
    await self.accept()
      
    
    
    
    