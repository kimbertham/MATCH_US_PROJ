from django.urls import path
from .views import MovieListView, MoviesDetailList,MovieConnectionView
urlpatterns = [
    path('',MovieListView.as_view()),
    path('<int:pk>/',MoviesDetailList.as_view()),
    path('<int:connection>/<int:partner>/',MovieConnectionView.as_view())
]
