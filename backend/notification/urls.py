from django.urls import path 

from . import views 

urlpatterns = [
  path('',views.NotificationListAPIView.as_view()),
  path('preview',views.preview_notifications)
]