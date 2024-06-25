# Generated by Django 5.0.6 on 2024-06-23 18:33

import cloudinary.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('APIs', '0004_customer_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='image',
            field=cloudinary.models.CloudinaryField(blank=True, default='', max_length=255, null=True, verbose_name='image'),
        ),
    ]