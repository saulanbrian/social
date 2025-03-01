from django.urls import path

from . import views

urlpatterns = [
  path('conversations',views.ConversationList.as_view()),
  path('conversations/get_or_create',views.get_or_create_conversation),
  path('conversations/<pk>',views.ConversationRetrieveAPIView.as_view()),
  path('conversation/<pk>/messages',views.ConversationMessageListCreate.as_view()),
]
