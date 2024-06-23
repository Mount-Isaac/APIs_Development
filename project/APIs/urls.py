from django.urls import path, re_path
from .views import(
    login_view,
    update_user_view,
    page404_view,
    register_view,
    update_password_view,
)
from rest_framework_simplejwt.views import (
    TokenRefreshView, 
)

urlpatterns = [
    path('token/refresh', TokenRefreshView.as_view(), name='refresh'),
    path('auth/register', register_view, name='register-user'),
    path('auth/login', login_view, name='login-user'),
    path('user/update/profile', update_user_view, name='update-user'),
    path('user/update/password', update_password_view, name='update-password'),
]

urlpatterns += [
    re_path(r'^(?!auth|user).*$', page404_view, name='page404')
]