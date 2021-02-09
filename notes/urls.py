from django.urls import path
from .views import NotesListView, NotesDetailsView

urlpatterns = [
    path('',NotesListView.as_view()),
    path('<int:pk>/<str:box>/',NotesDetailsView.as_view())
]
