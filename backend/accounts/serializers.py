from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User, BusinessProfile, CustomerProfile
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_business_owner']


class RegisterSerializer(serializers.ModelSerializer):
    # Add optional business fields (only used if user is_business_owner=True)
    business_name = serializers.CharField(required=False, allow_blank=True)
    address = serializers.CharField(required=False, allow_blank=True)
    phone = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'password',
            'is_business_owner',
            'business_name',
            'address',
            'phone',
        ]
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        business_name = validated_data.pop('business_name', None)
        address = validated_data.pop('address', None)
        phone = validated_data.pop('phone', None)
        is_business_owner = validated_data.get('is_business_owner', False)

        # Create the user
        user = User.objects.create_user(**validated_data)

        # Create appropriate profile
        if is_business_owner:
            BusinessProfile.objects.create(
                user=user,
                business_name=business_name or user.username,
                address=address,
                phone=phone,
            )
        else:
            CustomerProfile.objects.create(user=user, phone=phone)

        return user

    def to_representation(self, instance):
        """Return JWT tokens right after registration."""
        data = super().to_representation(instance)
        refresh = RefreshToken.for_user(instance)
        data['tokens'] = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
        return data



class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        user = authenticate(email=email, password=password)
        if not user:
            raise serializers.ValidationError({'detail': 'Invalid email or password'})

        data = super().validate(attrs)
        data['email'] = self.user.email
        data['username'] = self.user.username
        return data