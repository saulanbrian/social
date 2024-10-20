from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/token/', TokenObtainPairView.as_view()),
    path('auth/token/refresh/', TokenObtainPairView.as_view()),
    path('api/',include('rest_framework.urls')),
    path('user/',include('user.urls'))
]
