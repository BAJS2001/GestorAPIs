# backend/apis/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('apis/', views.lista_apis, name='lista_apis'),
    path('crear/', views.crear_api, name='crear_api'),
]
