from django.urls import path
from .views import RegisterView, LoginView, ProfileView, ProfilesView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('profile/<int:pk>/', ProfileView.as_view()),
    path('profiles/', ProfilesView.as_view())
]
