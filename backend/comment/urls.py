from django.urls import path 

from . import views

urlpatterns = [
  path('',views.CommentListAPIView.as_view()),
  path('<pk>',views.CommentRetrieveAPIView.as_view())
]