from django.urls import path
from .views import LocationsView, LocationGeoView

urlpatterns = [
    path('', LocationsView.as_view()),
    path('<int:pk>/', LocationGeoView.as_view()),
]
