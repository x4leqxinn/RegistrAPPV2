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
    path('alumno/',AlumnoView.as_view(), name = "listaAlumnos"),
    path('asistencia/',AsistenciaView.as_view(), name = "listaAsistencias"),
    path('asistencia/<int:id>',AsistenciaView.as_view(), name = "procesoAsistencia"),
    path('login/',LoginView.as_view(), name = "Login"),
    path('guardar-asistencia/',GuardarAsistenciaView.as_view(), name = "guardarAsistencia"),
    path('codigoqr/',CodigoQR.as_view(), name = "procesoCodigoQR"),
    url(r'^apirest/alumno/$',views.AlumnoViewSet.as_view()),
]

# 
urlpatterns = format_suffix_patterns(urlpatterns)


#Agregar a las rutas existentes la UBICACIÓN DE LA CARPETA MEDIA
if settings.DEBUG:
    urlpatterns+=static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)


