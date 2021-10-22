from django.http.response import JsonResponse
from django.shortcuts import render
# Importamos la librería para conectarnos a ORACLE
from django.db import connection
import cx_Oracle
from django.views.decorators.csrf import csrf_exempt
# Importamos la página de Django Rest Framework
from rest_framework import generics
# Importamos las tablas del Modelo
from .models import *
# Importamos los Serializadores
from .serializers import *

#
from django.views import View
#
from django.utils.decorators import method_decorator
#
from django.views.decorators.csrf import csrf_exempt
#
import json
# Create your views here.

# Aquí realizamos los métodos para el Backend
def alumnos(request):
    print(listarAlumnos()) 
    data = {
        'alumnos':listarAlumnos()
    }
    return render(request,'core/alumnos.html',data)

# Método que me rescata a todos los Alumnos de la BDD
def listarAlumnos():
    # Variable que nos conecta a la BDD 
    django_cursor = connection.cursor()
    # Variable que se conecta con la BDD y puede realizar llamados SP
    cursor = django_cursor.connection.cursor() 
    # Variables de Oracle
    out_cursor = django_cursor.connection.cursor() # Recibe los datos
    valida = cursor.var(cx_Oracle.NUMBER)
    lista = []
    try:
        # llamado a la BDD Mediante un SP
        cursor.callproc("PKG_ALUMNO.SP_LISTAR_ALUMNO",[out_cursor,valida])
        # Recibimos el cursor y lo transformamos a una lista
        for fila in out_cursor:
            lista.append(fila)
    except:
        valida = 0
    return lista

# Método que me registra la Asistencia
def agregarAsistencia(estadoID):
    django_cursor = connection.cursor()
    cursor = django_cursor.connection.cursor() 
    #Salida
    valida = cursor.var(cx_Oracle.NUMBER)
    try:
        cursor.callproc("PKG_ASISTENCIA.SP_INSERTAR_ASISTENCIA",[estadoID,valida])
        #Retorna 0 o 1
        return valida.getvalue()
    except:
        return 0

#Método que me actualiza la asistencia
def modificarAsistencia(asistenciaID, estadoID):
    django_cursor = connection.cursor()
    cursor = django_cursor.connection.cursor() 
    valida = cursor.var(cx_Oracle.NUMBER)    
    try:
        cursor.callproc("PKG_ASISTENCIA.SP_MODIFICAR_ASISTENCIA",[asistenciaID,estadoID,valida])  
        #Retorna 0 o 1
        return valida.getvalue()      
    except:
        return 0

# Método que elimina la asistencia por ID
def eliminarAsistencia(asistenciaID):
    django_cursor = connection.cursor()
    cursor = django_cursor.connection.cursor() 
    valida = cursor.var(cx_Oracle.NUMBER)    
    try:
        cursor.callproc("PKG_ASISTENCIA.SP_ELIMINAR_ASISTENCIA",[asistenciaID,valida])  
        #Retorna 0 o 1
        return valida.getvalue()  
    except:
        return 0

# Método que me busca la Asistencia
def buscarAsistencia(asistenciaID):
    django_cursor = connection.cursor()
    cursor = django_cursor.connection.cursor() 
    out_cursor = django_cursor.connection.cursor() # Recibe los datos
    valida = cursor.var(cx_Oracle.NUMBER)    
    lista = []
    try:         
        cursor.callproc("PKG_ASISTENCIA.SP_BUSCAR_ASISTENCIA",[asistenciaID,out_cursor,valida])
        for fila in out_cursor:
            lista.append(fila)
    except:
        valida = 0
    return lista

# Método que me rescata a todos las Asistencias de la BDD
def listarAsistencia():
    django_cursor = connection.cursor()
    cursor = django_cursor.connection.cursor() 
    out_cursor = django_cursor.connection.cursor() # Recibe los datos
    valida = cursor.var(cx_Oracle.NUMBER)
    lista = []
    try:
        # llamado a la BDD Mediante un SP
        cursor.callproc("PKG_ASISTENCIA.SP_LISTAR_ASISTENCIA",[out_cursor,valida])
        for fila in out_cursor:
            lista.append(fila)
    except:
        valida = 0
    return lista

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


class AsistenciaView(View):
    # Se ejecuta cada vez que queremos realizar una acción 
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self,request, id=0):
        if(id>0):
            asistencia = buscarAsistencia(id)
            if len(asistencia)>0:
                asistencia = asistencia[0]
                datos={'mensaje':'Encontrado', 'asistencia':asistencia}
            else:
                datos={'mensaje':'No encontrado'}

            return JsonResponse(datos)
        else:
            asistencias = listarAsistencia()
            if len(asistencias)>0:
                datos={'mensaje':'Hay datos', 'asistencias':asistencias}
            else:
                datos={'mensaje':'No hay datos'}

            return JsonResponse(datos)
    
    def post(self,request):        
        jsonData = json.loads(request.body)
        valida = agregarAsistencia(jsonData["estadoID"])
        if valida == 1:
            datos={'mensaje':'Success'}
        else:
            datos={'mensaje':'No se pudo ingresar'}
        return JsonResponse(datos)
    
    def put(self,request,id):
        jsonData = json.loads(request.body)
        asistencia = buscarAsistencia(id)
        if len(asistencia)>0:
            valida = modificarAsistencia(id, jsonData["estadoID"])
            if valida == 1:
                datos={'mensaje':'Success'}
            else:
                datos={'mensaje':'No se pudo actualizar'}
        else:
            datos={'mensaje':'No encontrado'}
        return JsonResponse(datos)
    
    def delete(self,request,id):
        valida = eliminarAsistencia(id)
        if valida == 1:
            datos={'mensaje':'Success'}
        else:
            datos={'mensaje':'No se pudo eliminar'}
        return JsonResponse(datos)
