from django.urls import path
from .views import *

#
from api import views
#from django.conf.urls import url
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
    path('asistencia/<int:claseID>/<int:cursoID>',ListarAsistenciaClase.as_view(), name = "listarAsistenciaClases"),
    path('login/',LoginView.as_view(), name = "Login"),
    path('guardar-asistencia/',GuardarAsistenciaView.as_view(), name = "guardarAsistencia"),
    path('codigoqr/',CodigoQRView.as_view(), name = "procesoCodigoQR"),
    path('listar-cursos-profesor/<int:rutProfesor>/',ListarCursoProfeView.as_view(), name = "listarCursosProfe"),
    path('listar-asignaturas-profesor/<int:rutProfesor>/<int:cursoID>',ListarAsignaturaProfeView.as_view(), name = "listarAsignaturasProfe"),
    path('listar-clases-profesor/<int:rutProfesor>/<int:cursoID>/<int:asignaturaID>',ListarClaseProfeView.as_view(), name = "listarClasesProfe"),
    path('listar-asignaturas-alumno/<int:rutAlumno>/',ListarAsignaturaAlumnoView.as_view(), name = "listarAsignaturasAlumno"),
    path('listar-clases-alumno/<int:rutAlumno>/<int:asignaturaID>/',ListarClaseAlumnoView.as_view(), name = "listarClasesAlumno"),
    path('buscar-estado-asistencia/<int:rutAlumno>/<int:claseID>/',EstadoAsistenciaAlumnoView.as_view(), name = "estadoAsistencia"),
    path('listar-asistencias-alumno/<int:rutAlumno>/',ListarAsistenciasAsignaturaAlumnoView.as_view(), name = "listarAsistenciasAlumno"),
    path('listar-asistencias-profesor/<int:rutProfesor>/',ListarAsistenciasAsignaturaProfesorView.as_view(), name = "listarAsistenciasProfesor"),
    path('perfil-usuario/<int:rut>/',MostrarPerfilUsuarioView.as_view(), name = "mostrarPerfilUsuario"),
    path('listar-estados/',ListarEstadosAsistenciaView.as_view(), name = "mostrarEstadosAsistencia"),
    #url(r'^apirest/alumno/$',views.AlumnoViewSet.as_view()),
]

# 
urlpatterns = format_suffix_patterns(urlpatterns)


#Agregar a las rutas existentes la UBICACIÓN DE LA CARPETA MEDIA
if settings.DEBUG:
    urlpatterns+=static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)


