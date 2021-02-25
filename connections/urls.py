from django.urls import path
from .views import ConnectionsListView, ConnectionsDetailView

urlpatterns = [
    path('connections/<int:pk>/', ConnectionsListView.as_view()),
    path('connection-full/<int:pk>/', ConnectionsDetailView.as_view())
]
