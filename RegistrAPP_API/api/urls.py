from django.urls import path
from .views import *

#
from api import views
from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns 

urlpatterns = [
    # Rutas
    path('', alumnos, name='alumno'),
    path('alu/',AlumnoView.as_view(), name = "listaAlumnos"),
    url(r'^apirest/alumno/$',views.AlumnoViewSet.as_view()),
]

# 
urlpatterns = format_suffix_patterns(urlpatterns)
