from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import User
from .serializers import RegisterSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated  # still protected
from rest_framework.views import APIView
from rest_framework import status

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


class UserStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        dummy_data = {
            "weekly": [
                {"week": "Week 1", "sessions": 3},
                {"week": "Week 2", "sessions": 5},
                {"week": "Week 3", "sessions": 2},
                {"week": "Week 4", "sessions": 4},
            ],
            "serviceBreakdown": [
                {"name": "Yoga", "value": 40},
                {"name": "Cardio", "value": 30},
                {"name": "Strength", "value": 30},
            ],
            "streak": 6,
        }
        return Response(dummy_data, status=status.HTTP_200_OK)