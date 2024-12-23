from django.urls import path

from . import views 

urlpatterns = [
  path('register/',views.UserCreateAPIView.as_view()),
  path('<pk>/',views.UserRetrieveAPIView.as_view()),
  path('<pk>/posts',views.UserPostListCreateAPIView.as_view()),
  path('<pk>/update/',views.UserUpdateView.as_view())
]