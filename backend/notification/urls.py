from django.urls import path 

from . import views 

urlpatterns = [
  path('',views.NotificationListAPIView.as_view()),
  path('preview',views.preview_notifications),
  path('mark_as_read',views.mark_notification_as_read)
]