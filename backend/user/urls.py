from django.urls import path

from . import views 

urlpatterns = [
  path('register/',views.UserCreateAPIView.as_view()),
  path('current',views.get_current_user),
  path('search',views.UserSearchList.as_view()),
  path('<pk>/',views.UserRetrieveAPIView.as_view()),
  path('<pk>/posts',views.UserPostListCreateAPIView.as_view()),
  path('<pk>/photos',views.UserImageListAPIView.as_view()),
  path('<pk>/update/',views.UserUpdateView.as_view()),
  path('<pk>/follow',views.follow_user),
  path('<pk>/unfollow',views.unfollow_user)
]