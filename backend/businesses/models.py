from django.db import models
from django.conf import settings

class Business(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=100, choices=[
        ('barbershop', 'Barbershop'),
        ('gym', 'Gym'),
        ('spa', 'Spa'),
    ])
    address = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
