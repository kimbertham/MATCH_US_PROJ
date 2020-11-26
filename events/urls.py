from django.urls import path
from .views import EventsDetailView, EventsListView

urlpatterns = [
    path('<str:pk>/',EventsListView.as_view()),
    path('<str:act>/<int:pk>/',EventsDetailView.as_view()),
]
