from django.db.models.signals import(
    pre_save, 
    post_save, 
    post_delete, 
    pre_delete
)
from django.dispatch import receiver
from APIs.models import (
    Customer, 
    Post
)

@receiver(post_save, sender=Customer)
def send_activation_email(sender, instance, created, **kwargs):
    if created:
        customer = instance.user