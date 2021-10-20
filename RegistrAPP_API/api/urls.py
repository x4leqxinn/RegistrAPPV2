from django.urls import path
from .views import *

urlpatterns = [
    # Rutas
    path('', alumnos, name='alumno'),
]
