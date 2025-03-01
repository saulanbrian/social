from rest_framework.generics import ListAPIView, RetrieveAPIView, ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from rest_framework.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status

from user.models import CustomUser as User
from .models import Conversation

class Pagination(PageNumberPagination):
  page_size = 10
  
class ChatPagination(PageNumberPagination):
  page_size = 20  


from .serializers import ConversationSerializer,ChatSerializer

from .models import Conversation, Chat

class ConversationList(ListAPIView):
  serializer_class = ConversationSerializer
  permission_classes = [IsAuthenticated]
  pagination_class = Pagination
  
  def get_queryset(self):
    user_id = self.request.user.id
    return Conversation.objects.filter(participants__id=user_id).exclude(messages__isnull=True)
  
  def get_serializer_context(self):
    context = super().get_serializer_context()
    context['current_user'] = self.request.user
    return context
  
class ConversationRetrieveAPIView(RetrieveAPIView):
  serializer_class = ConversationSerializer
  permission_classes = [IsAuthenticated]
  lookup_field = 'pk'
  
  def get_queryset(self):
    return Conversation.objects.filter(participants__id=self.request.user.id)
  
  def get_serializer_context(self):
    context =  super().get_serializer_context()
    context['current_user'] = self.request.user
    return context
  
  
class ConversationMessageListCreate(ListCreateAPIView):
  serializer_class =  ChatSerializer
  permission_classes = [IsAuthenticated]
  pagination_class = ChatPagination
  
  def get_queryset(self):
    conversation_id = self.kwargs.get('pk')
    conversation = get_object_or_404(Conversation,pk=conversation_id)
    user_id = self.request.user.id
    if conversation.participants.filter(id=user_id).exists():
      return conversation.messages.order_by('-timestamp')
    else:
      raise PermissionDenied(detail='you have no permission to view this post')
    
  def perform_create(self, serializer):
    conversation_id = self.kwargs.get('pk')
    conversation = get_object_or_404(Conversation,pk=conversation_id)
    serializer.save(
      sender=self.request.user,
      conversation=conversation
    )
 


@permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_or_create_conversation(request):
  user_id = request.query_params.get('userId',None)
  if not user_id:
    return Response({'error':'userId is required'},status=status.HTTP_400_BAD_REQUEST)
  
  user = get_object_or_404(User,pk=user_id)
  
  conversation = Conversation.objects.filter(
    participants__id=request.user.id
  ).filter(
    participants__id=user_id
  ).first()
  
  if not conversation:
    conversation = Conversation.objects.create()
    conversation.participants.set([user,request.user])
    
  serializer = ConversationSerializer(conversation,context={'current_user':request.user})
  return Response(serializer.data,status=status.HTTP_200_OK)