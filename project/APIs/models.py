from django.db import models
from django.contrib.auth.models import User


# whenever a user deletes their account and they 
# have Blogs associated with them, transfer the 
# ownership to the admin
# admin_user = User.objects.get(username='admin')

class Customer(models.Model):
    '''
        EXPECTED JSON OBJECT FORMAT
        {
            "email": "isaackyalo@mail.co.ke",
            "first_name": "isaac",
            "last_name": "kyalo",
            "phone_number": "255982018924",
            "password": "#8sj92980uojksf"
        }
    '''
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='customer')
    email = models.EmailField(max_length=80, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=50)
    # add user cloudinary image upload

    def __str__(self):
        return f'{self.first_name} {self.last_name}'


class Blog(models.Model):
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=30)
    content = models.TextField(blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    # add cloudinary image upload

    def __str__(self):
        return f"{self.title.capitalize()}"