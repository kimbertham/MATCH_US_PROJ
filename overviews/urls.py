from django.urls import path
from .views import Overview

urlpatterns = [
    path('<int:pk>/<str:sec>/', Overview.as_view()),
]
