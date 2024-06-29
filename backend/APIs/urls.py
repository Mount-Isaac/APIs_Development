from django.urls import path, re_path
from .views import(
    login_view,
    page404_view,
    register_view,
    update_user_view,
    update_password_view,
    update_profile_picture,
    create_post_view,
    update_post_view,
    user_posts_view,
    all_posts_view,
    delete_post_view,
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
    path('user/update/image', update_profile_picture, name='update-image'),

    path('post/create', create_post_view, name='create-post'),
    path('post/view/<str:id>', create_post_view, name='create-post'),
    path('post/update/<str:id>', update_post_view, name='update-post'),
    path('post/delete/<str:id>', delete_post_view, name='delete-post'),
    path('post/all', all_posts_view, name='all-posts'),
    path('post/user/<str:id>', user_posts_view, name='user-posts'),


]

urlpatterns += [
    re_path(r'^(?!auth|user).*$', page404_view, name='page404')
]