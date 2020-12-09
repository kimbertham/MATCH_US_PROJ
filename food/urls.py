from django.urls import path
from .views import FoodListView, FoodDetailList

urlpatterns = [
    path('',FoodListView.as_view()),
    path('<int:pk>/',FoodDetailList.as_view())
]
