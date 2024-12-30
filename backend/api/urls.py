from django.urls import path
from .views import AppsListCreateView, AppsDetailView, TaskImageView

urlpatterns = [
    path('apps/', AppsListCreateView.as_view(), name='apps-list-create'),
    path('apps/<int:pk>/', AppsDetailView.as_view(), name='app-detail'),
    path('apps/<int:app_id>/task-images/', TaskImageView.as_view(), name='app-task-images'),
]
