from django.urls import path 

from . import consumers

notification_ws_urlpatterns = [
  path('ws/notification/',consumers.NotificationConsumer.as_asgi())
]