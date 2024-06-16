from django.contrib import admin
from .models import CustomUser, Client

# Register your models here.
def register_models(*models):
    for model in models:
        admin.site.register(model)


register_models(CustomUser, Client)