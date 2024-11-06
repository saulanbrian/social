from django.urls import path 

from . import views

urlpatterns = [
  path('',views.CommentListCreateAPIView.as_view())
]