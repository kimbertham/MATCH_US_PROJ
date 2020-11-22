from django.urls import path
from .views import EventsListView

urlpatterns = [
    path('<int:pk>/',EventsListView.as_view()),
]
