from django.urls import path 
from .views import(
    register_view,
    login_View
)

urlpatterns = [
    path('auth/register', register_view, name='register-user'),
    path('auth/login', login_View, name='login-user')

]