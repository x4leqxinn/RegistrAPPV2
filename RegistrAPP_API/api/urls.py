from django.urls import path
from .views import *

#
from api import views
from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns 

#Importar una libreria de ubicaciones estáticas para poder cargar imagenes
from django.conf.urls.static import static
#importar el archivo de configuraciones "settings.py"
from django.conf import settings

urlpatterns = [
    # Rutas
    path('', alumnos, name='alumno'),
    path('alu/',AlumnoView.as_view(), name = "listaAlumnos"),
    url(r'^apirest/alumno/$',views.AlumnoViewSet.as_view()),
]

# 
urlpatterns = format_suffix_patterns(urlpatterns)


#Agregar a las rutas existentes la UBICACIÓN DE LA CARPETA MEDIA
if settings.DEBUG:
    urlpatterns+=static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)


