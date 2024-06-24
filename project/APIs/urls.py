from django.urls import path, re_path
from .views import(
    login_view,
    page404_view,
    register_view,
    update_user_view,
    update_password_view,
    update_profile_picture,
    create_blog_view,
    update_blog_view,
    all_blogs_view,
    delete_blog_view,
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
    path('user/create/blog', create_blog_view, name='create-blog'),
    path('user/update/blog/<str:id>', update_blog_view, name='update-blog'),
    path('all/blogs', all_blogs_view, name='all-blogs'),
    path('user/delete/blog/<str:id>', delete_blog_view, name='delete-blog'),

]

urlpatterns += [
    re_path(r'^(?!auth|user).*$', page404_view, name='page404')
]