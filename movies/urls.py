from django.urls import path
from .views import MovieDetailsView, MovieView, MovieRandomView

urlpatterns = [
    path('',MovieView.as_view()),
    path('random/', MovieRandomView.as_view()),
    path('<int:pk>/',MovieDetailsView.as_view())
]
