from django.shortcuts import get_object_or_404
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response 
from rest_framework import status

from rest_framework.pagination import PageNumberPagination

from .serializers import NotificationSerializer
from .models import Notification


class NotificationPagination(PageNumberPagination):
  page_size = 10


class NotificationListAPIView(ListAPIView):
  serializer_class = NotificationSerializer
  permission_classes = [IsAuthenticated]
  pagination_class = NotificationPagination
  
  def get_queryset(self):
    return Notification.objects.filter(receiver=self.request.user).order_by('-date_time_created')
    
    
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def preview_notifications(request):
  notification_ids = request.data.get('notification_ids')
  print(notification_ids)
  for _id in notification_ids:
    notification = get_object_or_404(Notification,pk=_id)
    notification.previewed = True
    notification.save()
  return Response(status=status.HTTP_200_OK)