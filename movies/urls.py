from django.urls import path
from .views import MovieDetailsView, MovieView

urlpatterns = [
    path('',MovieView.as_view()),
    path('<int:pk>/',MovieDetailsView.as_view()),
]
