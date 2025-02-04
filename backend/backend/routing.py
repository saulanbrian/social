from django.urls import re_path 

from . import consumers
from chat.consumers import ChatConsumer

websocket_urlpatterns = [
    re_path(r'^conversation/(?P<pk>[\w-]+)$', ChatConsumer.as_asgi()),
    re_path(r'^$', consumers.MainConsumer.as_asgi()), 
]