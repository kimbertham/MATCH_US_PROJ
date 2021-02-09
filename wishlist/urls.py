from django.urls import path
from .views import WishlistView, WishlistDetailsView

urlpatterns = [
    path('',WishlistView.as_view()),
    path('<int:pk>/', WishlistDetailsView.as_view())
]
