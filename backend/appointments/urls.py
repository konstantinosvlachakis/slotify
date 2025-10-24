from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import AppointmentViewSet, ServiceViewSet, StaffViewSet, user_stats

router = DefaultRouter()
router.register('appointments', AppointmentViewSet)
router.register('services', ServiceViewSet)
router.register('staff', StaffViewSet)

urlpatterns = [
    *router.urls,
    path('stats/', user_stats, name='user-stats'),
]
