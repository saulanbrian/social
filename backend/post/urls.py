from django.urls import path  

from . import views

urlpatterns = [
  path('',views.PosListCreateAPIView.as_view())
]