from django.urls import path
from .views import MovieListView, MoviesDetailList
urlpatterns = [
    path('',MovieListView.as_view()),
    path('<int:pk>/',MoviesDetailList.as_view())
]
