from rest_framework import viewsets, permissions
from .models import Appointment, Service, Staff
from .serializers import AppointmentSerializer, ServiceSerializer, StaffSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.db.models import Count
from datetime import date, timedelta


class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Restrict appointments by user or business.
        """
        user = self.request.user
        if user.is_authenticated:
            if user.is_business_owner:
                # Return appointments for their business
                return Appointment.objects.filter(business__user=user)
            else:
                # Return appointments for this user
                return Appointment.objects.filter(user=user)
        return Appointment.objects.none()


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [permissions.AllowAny]


class StaffViewSet(viewsets.ModelViewSet):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer
    permission_classes = [permissions.AllowAny]


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_stats(request):
    user = request.user
    today = date.today()
    start_date = today - timedelta(weeks=6)

    weekly_data = (
        Appointment.objects.filter(user=user, date__gte=start_date)
        .extra({'week': "strftime('%%W', date)"})
        .values('week')
        .annotate(sessions=Count('id'))
        .order_by('week')
    )

    service_data = (
        Appointment.objects.filter(user=user)
        .values('service__name')
        .annotate(value=Count('id'))
        .order_by('-value')
    )

    active_weeks = {int(a['week']) for a in weekly_data}
    streak = 0
    for i in range(6):
        if (today.isocalendar().week - i) in active_weeks:
            streak += 1
        else:
            break

    # ✅ Fallback dummy data for when DB is empty
    if not weekly_data and not service_data:
        weekly_data = [
            {"week": "Week 1", "sessions": 3},
            {"week": "Week 2", "sessions": 5},
            {"week": "Week 3", "sessions": 2},
            {"week": "Week 4", "sessions": 4},
        ]
        service_data = [
            {"service__name": "Yoga", "value": 40},
            {"service__name": "Cardio", "value": 30},
            {"service__name": "Strength", "value": 30},
        ]
        streak = 6

    return Response({
        "weekly": list(weekly_data),
        "serviceBreakdown": list(service_data),
        "streak": streak
    })