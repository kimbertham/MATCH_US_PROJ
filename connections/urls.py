from django.urls import path
from .views import ConnectionsListView, RequestsListView, ConnectionsDetailView

urlpatterns = [
    path('requests/<int:pk>/', RequestsListView.as_view()),
    path('connections/<int:pk>/', ConnectionsListView.as_view()),
    path('connection-full/<int:pk>/', ConnectionsDetailView.as_view())
]
