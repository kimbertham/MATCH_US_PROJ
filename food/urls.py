from django.urls import path
from .views import  FoodDetailsView,  FoodView, FoodListView, FoodRandomView

urlpatterns = [
    path('', FoodView.as_view()),
    path('random/', FoodRandomView.as_view()),
    path('<int:pk>/',FoodDetailsView.as_view()),
    path('<path:place_id>/',FoodListView.as_view())
]
