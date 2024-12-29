from django.urls import path
from .views import AppsListCreateView, AppsDetailView

urlpatterns = [
    path('apps/',AppsListCreateView.as_view(), name='Student-list_create'), 
    path('apps/<int:pk>',AppsDetailView.as_view(), name='App-detail')

]