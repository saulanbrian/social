from django.urls import path  

from . import views

urlpatterns = [
  path('',views.PosListCreateAPIView.as_view()),
  path('<pk>',views.PostRetrieveAPIView.as_view()),
  path('<pk>/like',views.like_post),
  path('<pk>/unlike',views.unlike_post),
]