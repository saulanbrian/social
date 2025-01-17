from .models import Conversation, Chat
from rest_framework import serializers

from user.serializers import UserSerializer

class ChatSerializer(serializers.ModelSerializer):
  
  sender = serializers.SerializerMethodField()
  
  class Meta:
    model = Chat
    fields = ('id','message','sender','is_read','timestamp')
    extra_kwars = {
      'timestamp': { 'read_only' : True },
      'sender': {'read_only': True},
      'is_read': {'required': False},
      'id': {'read_only': True}
    }
    
  def get_sender(self,obj):
    return UserSerializer(obj.sender).data
    
    
class ConversationSerializer(serializers.ModelSerializer):
  
  last_message = serializers.SerializerMethodField()
  other_end = serializers.SerializerMethodField()
  
  class Meta:
    model = Conversation
    fields = ('id','participants','last_message','other_end')
    
  def get_last_message(self,obj):
    last_message =  obj.messages.last()
    if last_message: 
      return ChatSerializer(last_message).data
    return None
  
  def get_other_end(self,obj):
    current_user = self.context.get('current_user')
    if current_user:
      other_end = obj.participants.exclude(id=current_user.id)
      return UserSerializer(other_end[0]).data
    return None