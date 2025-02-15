from django.urls import path

from . import views

urlpatterns = [
  path('',views.SearchAPIView.as_view())
]
