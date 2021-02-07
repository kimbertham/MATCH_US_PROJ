from django.urls import path
from .views import  ActivitiesDetailsView,  ActivitiesView, ActivitiesListView, ActivitiesRandomView

urlpatterns = [
    path('', ActivitiesView.as_view()),
    path('random/', ActivitiesRandomView.as_view()),
    path('<int:pk>/', ActivitiesDetailsView.as_view()),
    path('<path:place_id>/', ActivitiesListView.as_view())
]
