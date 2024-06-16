from django.urls import path, re_path
from .views import(
    login_view,
    update_user_view,
    page404_view,
    register_view,
)
from rest_framework_simplejwt.views import (
    TokenRefreshView, 
    TokenObtainPairView
)

urlpatterns = [
    path('token', TokenObtainPairView.as_view(), name='token'),
    path('token/refresh', TokenRefreshView.as_view(), name='refresh'),
    path('auth/register', register_view, name='register-user'),
    path('auth/login', login_view, name='login-user'),
    path('user/update', update_user_view, name='update-user'),
]

urlpatterns += [
    re_path(r'^(?!auth/user).*$', page404_view, name='page404')
]