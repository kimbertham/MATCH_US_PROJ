from django.urls import path
from .views import FoodListView,FoodConnectionView, FoodDetailsView

urlpatterns = [
    path('',FoodListView.as_view()),
    path('<int:pk>/',FoodDetailsView.as_view()),
    path('<int:connection>/<int:partner>/',FoodConnectionView.as_view())
]
