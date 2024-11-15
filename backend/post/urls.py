from django.urls import path  

from . import views

urlpatterns = [
  path('',views.PosListCreateAPIView.as_view()),
  path('<pk>',views.PostRetrieveAPIView.as_view())
]