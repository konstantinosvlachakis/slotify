from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    is_business_owner = models.BooleanField(default=False)
    business_name = models.CharField(max_length=255, blank=True, null=True)
