from django.urls import path
from .views_auth import CookieTokenLoginView, LogoutView
from .views import UserStatsView, RegisterView

urlpatterns = [
    path('token/', CookieTokenLoginView.as_view(), name='token_login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('user/', UserStatsView.as_view(), name='user-detail'),
    path('register/', RegisterView.as_view(), name='register'),
]
