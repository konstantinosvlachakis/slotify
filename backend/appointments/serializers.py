from rest_framework import serializers
from .models import Service, Staff, Appointment


class ServiceSerializer(serializers.ModelSerializer):
    business_name = serializers.CharField(source='business.business_name', read_only=True)

    class Meta:
        model = Service
        fields = ['id', 'name', 'duration', 'price', 'business', 'business_name']


class StaffSerializer(serializers.ModelSerializer):
    business_name = serializers.CharField(source='business.business_name', read_only=True)

    class Meta:
        model = Staff
        fields = ['id', 'name', 'role', 'is_active', 'business', 'business_name']


class AppointmentSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)
    business_name = serializers.CharField(source='business.business_name', read_only=True)
    service_name = serializers.CharField(source='service.name', read_only=True)
    staff_name = serializers.CharField(source='staff.name', read_only=True)

    class Meta:
        model = Appointment
        fields = [
            'id',
            'user',
            'user_name',
            'business',
            'business_name',
            'service',
            'service_name',
            'staff',
            'staff_name',
            'date',
            'time',
            'duration',
            'status',
            'created_at',
        ]
        read_only_fields = ['status', 'created_at', 'duration']

    def validate(self, data):
        """
        Prevent overlapping appointments for same staff/business.
        """
        staff = data.get('staff')
        business = data.get('business')
        date = data.get('date')
        time = data.get('time')

        existing = Appointment.objects.filter(
            staff=staff,
            business=business,
            date=date,
            time=time,
            status='booked',
        )

        if existing.exists():
            raise serializers.ValidationError("This time slot is already booked.")
        return data

    def create(self, validated_data):
        """
        Auto-fill duration from the selected service if not provided.
        """
        service = validated_data.get('service')
        if service and not validated_data.get('duration'):
            validated_data['duration'] = service.duration
        return super().create(validated_data)
