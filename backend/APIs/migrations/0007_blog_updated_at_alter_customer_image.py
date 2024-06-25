# Generated by Django 5.0.6 on 2024-06-24 07:29

import cloudinary.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('APIs', '0006_alter_customer_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='blog',
            name='updated_at',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AlterField(
            model_name='customer',
            name='image',
            field=cloudinary.models.CloudinaryField(blank=True, default='https://res.cloudinary.com/dkzk3c8rt/image/upload/v1719169562/APIs_customers/ja0cm5vzpjjzkzfhkpcs.png', max_length=255, null=True, verbose_name='image'),
        ),
    ]
