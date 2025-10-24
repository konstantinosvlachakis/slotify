from datetime import timedelta
from django.contrib.auth import authenticate
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny


class CookieTokenLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        print("AUTH DEBUG:", attrs)
        user = authenticate(username=attrs.get("email"), password=attrs.get("password"))
        print("AUTH RESULT:", user)
        if not user:
            raise serializers.ValidationError({"detail": "Invalid email or password"})

        refresh = RefreshToken.for_user(user)
        return {
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "is_business_owner": user.is_business_owner,
            },
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        }


class CookieTokenLoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        print("LOGIN DEBUG:", request.data)
        serializer = CookieTokenLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        access = data["access"]
        refresh = data["refresh"]
        user_data = data["user"]

        response = Response(user_data, status=status.HTTP_200_OK)

        # ✅ Local dev setup
        response.set_cookie(
            key="access",
            value=access,
            httponly=True,
            secure=True,      # use True in production with HTTPS
            samesite="None",   # allow frontend on 5173
            max_age=int(timedelta(minutes=5).total_seconds()),
        )
        response.set_cookie(
            key="refresh",
            value=refresh,
            httponly=True,
            secure=True,
            samesite="None",
            max_age=int(timedelta(days=7).total_seconds()),
        )

        return response


class LogoutView(APIView):
    def post(self, request):
        """
        Logs out the user by deleting JWT cookies.
        """
        response = Response(
            {"detail": "Logged out successfully."},
            status=status.HTTP_200_OK,
        )
        response.delete_cookie("access")
        response.delete_cookie("refresh")
        return response
