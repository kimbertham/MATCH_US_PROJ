from django.urls import path
from .views import FoodListView, FoodDetailList

urlpatterns = [
    path('',FoodListView.as_view()),
    path('<int:connection>/<int:partner>/',FoodDetailList.as_view())
]
