from django.contrib import admin
from django.conf import settings 
from django.conf.urls.static import static

from django.urls import path, include
from rest_framework_simplejwt.views import (
  TokenObtainPairView,
  TokenRefreshView
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/token/',TokenObtainPairView.as_view()),
    path('auth/token/refresh/',TokenRefreshView.as_view()),
    path('user/',include('user.urls'))
] 

if settings.DEBUG:
  urlpatterns += static(
    settings.MEDIA_URL,
    document_root=settings.MEDIA_ROOT)
