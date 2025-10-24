# backend/accounts/auth.py
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import exceptions
from rest_framework_simplejwt.tokens import AccessToken

class CookieJWTAuthentication(JWTAuthentication):
    """
    Custom JWT authentication that reads the access token from HttpOnly cookies.
    """

    def authenticate(self, request):
        # Try to get access token from the cookie
        access_token = request.COOKIES.get("access")
        if not access_token:
            return None

        try:
            validated_token = AccessToken(access_token)
        except Exception:
            raise exceptions.AuthenticationFailed("Invalid or expired access token")

        user = self.get_user(validated_token)
        return (user, validated_token)
