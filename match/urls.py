from django.urls import path
from .views import MatchListView, MatchConnectionsView

urlpatterns = [
    path('<str:section>/<int:pk>/',MatchListView.as_view()),
    path('<str:section>/<int:connection>/<int:partner>/', MatchConnectionsView.as_view()),
]
