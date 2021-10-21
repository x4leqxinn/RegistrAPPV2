from django.http.response import JsonResponse
from django.shortcuts import render
# Importamos la librería para conectarnos a ORACLE
from django.db import connection
import cx_Oracle
# Importamos la página de Django Rest Framework
from rest_framework import generics
# Importamos las tablas del Modelo
from .models import *
# Importamos los Serializadores
from .serializers import *

#
from django.views import View
# Create your views here.

# Aquí realizamos los métodos para el Backend
def alumnos(request):
    print(listarAlumnos()) 
    valida = agregarAsistencia(1)
    if valida == 1:
        print("OWO");
    else:
        print("NOT OWO :(")

    data = {
        'alumnos':listarAlumnos()
    }
    return render(request,'core/alumnos.html',data)

def listarAlumnos():
    # Variable que nos conecta a la BDD 
    django_cursor = connection.cursor()
    # Variable que se conecta con la BDD y puede realizar llamados SP
    cursor = django_cursor.connection.cursor() 
    # Variables de Oracle
    out_cursor = django_cursor.connection.cursor() # Recibe los datos
    valida = cursor.var(cx_Oracle.NUMBER)

    # llamado a la BDD Mediante un SP
    cursor.callproc("PKG_ALUMNO.SP_LISTAR_ALUMNO",[out_cursor,valida])
    # Recibimos el cursor y lo transformamos a una lista
    lista = []
    for fila in out_cursor:
        lista.append(fila)
    return lista


def agregarAsistencia(estadoID):
    django_cursor = connection.cursor()
    cursor = django_cursor.connection.cursor() 
    #Salida
    valida = cursor.var(cx_Oracle.NUMBER)
    cursor.callproc("PKG_ASISTENCIA.SP_INSERTAR_ASISTENCIA",[estadoID,valida])
    #Retorna 0 o 1
    return valida.getvalue()



# Vista de la API
class AlumnoViewSet(generics.ListAPIView):
    queryset = Persona.objects.all()
    serializer_class = AlumnoSerializers

#################################################
# API con métodos (POST - GET - PUT - DELETE)
#################################################
class AlumnoView(View):

    def get(self,request):
        # alumnos = list(Persona.objects.values()) Serializar JSON
        alumnos = listarAlumnos()
        if len(alumnos)>0:
            datos={'mensaje':'Hay datos', 'alumnos':alumnos}
        else:
            datos={'mensaje':'No hay datos'}

        return JsonResponse(datos)
    
    def post(self,request):
        pass
    
    def put(self,request):
        pass
    
    def delete(self,request):
        pass
