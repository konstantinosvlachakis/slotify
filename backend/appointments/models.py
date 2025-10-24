# appointment/models.py
from django.db import models
from django.conf import settings
from businesses.models import Business

class Service(models.Model):
    business = models.ForeignKey(Business, on_delete=models.CASCADE, related_name="services")
    name = models.CharField(max_length=100)
    duration = models.DurationField(help_text="Duration of service, e.g. 00:30:00 for 30 minutes")
    price = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return f"{self.name} ({self.business.name})"


class Staff(models.Model):
    business = models.ForeignKey(Business, on_delete=models.CASCADE, related_name="staff")
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100, blank=True, null=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} ({self.business.name})"


class Appointment(models.Model):
    STATUS_CHOICES = [
        ('booked', 'Booked'),
        ('cancelled', 'Cancelled'),
        ('completed', 'Completed'),
    ]

    business = models.ForeignKey(Business, on_delete=models.CASCADE, related_name="appointments")
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="appointments")
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    staff = models.ForeignKey(Staff, on_delete=models.SET_NULL, null=True, blank=True)
    date = models.DateField()
    time = models.TimeField()
    duration = models.DurationField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='booked')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('business', 'date', 'time', 'staff')
        ordering = ['-date', '-time']

    def __str__(self):
        return f"{self.user} - {self.service.name} @ {self.date} {self.time}"

    def save(self, *args, **kwargs):
        if not self.duration:
            self.duration = self.service.duration
        super().save(*args, **kwargs)
