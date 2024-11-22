from django.urls import path 

from . import views

urlpatterns = [
  path('',views.CommentListAPIView.as_view()),
]