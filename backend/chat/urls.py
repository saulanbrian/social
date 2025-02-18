from django.urls import path

from . import views

urlpatterns = [
  path('conversations',views.ConversationList.as_view()),
  path('conversations/find',views.find_conversation_with_user),
  path('conversations/<pk>',views.ConversationRetrieveAPIView.as_view()),
  path('conversation/<pk>/messages',views.ConversationMessageListCreate.as_view()),
]
