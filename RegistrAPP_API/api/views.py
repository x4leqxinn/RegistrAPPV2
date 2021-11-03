from django import views
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
    print(listarAlumnos())  # Lo tengo!!
    #print(listarAsistenciaAsignatura(20281676))
    '''
    for x in range(len(datos)):
        data = {
                'rutAlumno':datos[x][0],
                'dv':datos[x][1],
                'nombre':datos[x][2],
                'nombre_s':datos[x][3],
                'nombre_t':datos[x][4],
                'apellido_p':datos[x][5],
                'apellido_m':datos[x][6],
                'email':datos[x][7],
                'usuario':datos[x][8],
                'genero':datos[x][9],
                'run':datos[x][10],
                'idcurso':datos[x][11]
        }
    '''

    lista = {"alumnos": listarAlumnos()}

    return render(request, 'core/alumnos.html', lista)

# Método que me rescata a todos los Alumnos de la BDD


def listarAlumnos():
    # Variable que nos conecta a la BDD
    django_cursor = connection.cursor()
    # Variable que se conecta con la BDD y puede realizar llamados SP
    cursor = django_cursor.connection.cursor()
    # Variables de Oracle
    out_cursor = django_cursor.connection.cursor()  # Recibe los datos
    valida = cursor.var(cx_Oracle.NUMBER)
    lista = []
    try:
        # llamado a la BDD Mediante un SP
        cursor.callproc("PKG_ALUMNO.SP_LISTAR_ALUMNO", [out_cursor, valida])
        # Recibimos el cursor y lo transformamos a una lista
        for fila in out_cursor:
            lista.append(fila)
    except:
        valida = 0
    return lista

# Método que me registra la Asistencia


def agregarAsistencia(estadoID, claseID, rutAlumno):
    django_cursor = connection.cursor()
    cursor = django_cursor.connection.cursor()
    # Salida
    valida = cursor.var(cx_Oracle.NUMBER)
    try:
        cursor.callproc("PKG_ASISTENCIA.SP_INSERTAR_ASISTENCIA", [
                        estadoID, claseID, rutAlumno, valida])
        # Retorna 0 o 1
        return valida.getvalue()
    except:
        return 0

# Método que me actualiza la asistencia


def modificarAsistencia(asistenciaID, estadoID):
    django_cursor = connection.cursor()
    cursor = django_cursor.connection.cursor()
    valida = cursor.var(cx_Oracle.NUMBER)
    try:
        cursor.callproc("PKG_ASISTENCIA.SP_MODIFICAR_ASISTENCIA", [
                        asistenciaID, estadoID, valida])
        # Retorna 0 o 1
        return valida.getvalue()
    except:
        return 0

# Método que elimina la asistencia por ID


def eliminarAsistencia(asistenciaID):
    django_cursor = connection.cursor()
    cursor = django_cursor.connection.cursor()
    valida = cursor.var(cx_Oracle.NUMBER)
    try:
        cursor.callproc("PKG_ASISTENCIA.SP_ELIMINAR_ASISTENCIA", [
                        asistenciaID, valida])
        # Retorna 0 o 1
        return valida.getvalue()
    except:
        return 0

# Método que me busca la Asistencia


def buscarAsistencia(asistenciaID):
    django_cursor = connection.cursor()
    cursor = django_cursor.connection.cursor()
    out_cursor = django_cursor.connection.cursor()  # Recibe los datos
    valida = cursor.var(cx_Oracle.NUMBER)
    lista = []
    try:
        cursor.callproc("PKG_ASISTENCIA.SP_BUSCAR_ASISTENCIA",[asistenciaID, out_cursor, valida])
        for fila in out_cursor:
            lista.append(fila)
    except:
        valida = 0
    return lista

# Método que me indica el estado actual de la asistencia del Alumno en un clase
def buscarAsistencia2(rutAlumno, claseID):
    django_cursor = connection.cursor()
    cursor = django_cursor.connection.cursor()
    valida = cursor.var(cx_Oracle.NUMBER)
    try:
        cursor.callproc("PKG_ASISTENCIA.SP_BUSCAR_ASISTENCIA2",[rutAlumno, claseID, valida])
        return valida.getvalue()    
    except:
        return 0


# Método que me rescata a todos las Asistencias de la BDD

def listarAsistencia():
    django_cursor = connection.cursor()
    cursor = django_cursor.connection.cursor()
    out_cursor = django_cursor.connection.cursor()  # Recibe los datos
    valida = cursor.var(cx_Oracle.NUMBER)
    lista = []
    try:
        # llamado a la BDD Mediante un SP
        cursor.callproc("PKG_ASISTENCIA.SP_LISTAR_ASISTENCIA",[out_cursor, valida])
        for fila in out_cursor:
            lista.append(fila)
    except:
        valida = 0
    return lista

# Método que lista las asistencias de una clase y curso en especifico


def listarAsistenciaClase(claseID, cursoID):
    django_cursor = connection.cursor()
    cursor = django_cursor.connection.cursor()
    out_cursor = django_cursor.connection.cursor()  # Recibe los datos
    valida = cursor.var(cx_Oracle.NUMBER)
    lista = []
    try:
        cursor.callproc("PKG_ASISTENCIA.SP_LISTAR_ASISTENCIA_CLASE", [claseID, cursoID, out_cursor, valida])
        for fila in out_cursor:
            # llamado a la BDD Mediante un SP
            lista.append(fila)
    except:
        valida = 0
    return lista

# Método que retorna una lista con la cantidad de asistencias por asignaturas del alumno de la sesión
def listarAsistenciaAsignatura(rutAlumno):
    django_cursor = connection.cursor()
    cursor = django_cursor.connection.cursor()
    out_cursor = django_cursor.connection.cursor()  # Recibe los datos
    lista = []
    try:
        cursor.callproc("PKG_ASISTENCIA.SP_LISTAR_ASISTENCIA_ASIGNATURA", [rutAlumno, out_cursor])
        for fila in out_cursor:
            # llamado a la BDD Mediante un SP
            lista.append(fila)
    except:
        print('No se encontraron datos.')
    return lista

# Método que retorna una lista con la cantidad del registro de asistencias de las asignaturas impartidad por el profesor de la sesión
def listarAsistenciaAsignatura2(rutProfesor):
    django_cursor = connection.cursor()
    cursor = django_cursor.connection.cursor()
    out_cursor = django_cursor.connection.cursor()  # Recibe los datos
    lista = []
    try:
        cursor.callproc("PKG_ASISTENCIA.SP_LISTAR_ASISTENCIA_ASIGNATURA2", [rutProfesor, out_cursor])
        for fila in out_cursor:
            # llamado a la BDD Mediante un SP
            lista.append(fila)
    except:
        print('No se encontraron datos.')
    return lista


def iniciarSesion(usuario, contrasenia):
    django_cursor = connection.cursor()
    cursor = django_cursor.connection.cursor()
    valida = cursor.var(cx_Oracle.NUMBER)
    bienvenida = cursor.var(cx_Oracle.STRING)
    rut = cursor.var(cx_Oracle.STRING)
    try:
        cursor.callproc("PKG_USUARIO.SP_LOGIN", [usuario, contrasenia, valida, bienvenida, rut])
        return valida.getvalue(), bienvenida.getvalue(), rut.getvalue()
    except:
        return 0, "", ""


def cambiarContrasenia(email, nuevaContrasenia):
    django_cursor = connection.cursor()
    cursor = django_cursor.connection.cursor()
    valida = cursor.var(cx_Oracle.NUMBER)
    try:
        cursor.callproc("PKG_USUARIO.SP_CAMBIAR_CONTRASENIA",[email, nuevaContrasenia, valida])
        return valida.getvalue()
    except:
        return 0


def guardarAsistencia(claseID, cursoID):
    django_cursor = connection.cursor()
    cursor = django_cursor.connection.cursor()
    valida = cursor.var(cx_Oracle.NUMBER)
    try:
        cursor.callproc("PKG_ASISTENCIA.SP_GUARDAR_ASISTENCIA",[claseID, cursoID, valida])
        return valida.getvalue()
    except:
        return 0


def generarCodigoQR(claseID, direccionQR):
    django_cursor = connection.cursor()
    cursor = django_cursor.connection.cursor()
    valida = cursor.var(cx_Oracle.NUMBER)
    try:
        cursor.callproc("PKG_CODIGO_QR.SP_GENERAR_CODIGO",[claseID, direccionQR, valida])
        return valida.getvalue()
    except:
        return 0


def escanearCodigoQR(claseID, direccionQR):
    django_cursor = connection.cursor()
    cursor = django_cursor.connection.cursor()
    valida = cursor.var(cx_Oracle.NUMBER)
    try:
        cursor.callproc("PKG_CODIGO_QR.SP_ESCANEAR_CODIGO",[claseID, direccionQR, valida])
        return valida.getvalue()
    except:
        return 0

# Métodos para listar en vista de profe


def listarCursoProfe(rutProfesor):
    django_cursor = connection.cursor()
    cursor = django_cursor.connection.cursor()
    out_cursor = django_cursor.connection.cursor()  # Recibe los datos
    lista = []
    try:
        cursor.callproc("PKG_PROFESOR.SP_LISTAR_CURSO",[rutProfesor, out_cursor])
        for fila in out_cursor:
            lista.append(fila)
    except:
        lista = []
    return lista


def listarAsignaturaProfe(rutProfesor, claseID):
    django_cursor = connection.cursor()
    cursor = django_cursor.connection.cursor()
    out_cursor = django_cursor.connection.cursor()  # Recibe los datos
    lista = []
    try:
        cursor.callproc("PKG_PROFESOR.SP_LISTAR_ASIGNATURA",[rutProfesor, claseID, out_cursor])
        for fila in out_cursor:
            lista.append(fila)
    except:
        lista = []
    return lista


def listarClaseProfe(rutProfesor, claseID, asignaturaID):
    django_cursor = connection.cursor()
    cursor = django_cursor.connection.cursor()
    out_cursor = django_cursor.connection.cursor()  # Recibe los datos
    lista = []
    try:
        cursor.callproc("PKG_PROFESOR.SP_LISTAR_CLASE", [rutProfesor, claseID, asignaturaID, out_cursor])
        for fila in out_cursor:
            lista.append(fila)
    except:
        lista = []
    return lista

# Métodos listar para la vista de Alumno


def listarAsignaturaAlumno(rutAlumno):
    django_cursor = connection.cursor()
    cursor = django_cursor.connection.cursor()
    out_cursor = django_cursor.connection.cursor()  # Recibe los datos
    lista = []
    try:
        cursor.callproc("PKG_ALUMNO.SP_LISTAR_ASIGNATURA",[rutAlumno, out_cursor])
        for fila in out_cursor:
            lista.append(fila)
    except:
        lista = []
    return lista


def listarClaseAlumno(rutAlumno, asignaturaID):
    django_cursor = connection.cursor()
    cursor = django_cursor.connection.cursor()
    out_cursor = django_cursor.connection.cursor()  # Recibe los datos
    lista = []
    try:
        cursor.callproc("PKG_ALUMNO.SP_LISTAR_CLASE", [rutAlumno, asignaturaID, out_cursor])
        for fila in out_cursor:
            lista.append(fila)
    except:
        lista = []
    return lista

# Método que retorna los datos del Usuario de la sesión
def perfilUsuario(rut):
    django_cursor = connection.cursor()
    cursor = django_cursor.connection.cursor()
    out_cursor = django_cursor.connection.cursor()  # Recibe los datos
    lista = []
    try:
        cursor.callproc("PKG_USUARIO.SP_LISTAR_PERFIL", [rut, out_cursor])
        for fila in out_cursor:
            lista.append(fila)
    except:
        lista = []
    return lista

# Vista de la API


class AlumnoViewSet(generics.ListAPIView):
    queryset = Persona.objects.all()
    serializer_class = AlumnoSerializers

#################################################
# API con métodos (POST - GET - PUT - DELETE)
#################################################


class AlumnoView(View):

    def get(self, request):
        # alumnos = list(Persona.objects.values()) Serializar JSON
        alumnos = listarAlumnos()
        if len(alumnos) > 0:
            datos = {'mensaje': 'Hay datos', 'alumnos': alumnos}
        else:
            datos = {'mensaje': 'No hay datos'}

        return JsonResponse(datos)

    def post(self, request):
        pass

    def put(self, request):
        pass

    def delete(self, request):
        pass

# Método API para Agregar, Modificar, Eliminar, Buscar y Listar (ASISTENCIAS)


class AsistenciaView(View):
    # Se ejecuta cada vez que queremos realizar una acción
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id=0):
        if(id > 0):
            asistencia = buscarAsistencia(id)
            if len(asistencia) > 0:
                asistencia = asistencia[0]
                datos = {'mensaje': 'Encontrado', 'asistencia': asistencia}
            else:
                datos = {'mensaje': 'No encontrado'}

            return JsonResponse(datos)
        else:
            asistencias = listarAsistencia()
            if len(asistencias) > 0:
                datos = {'mensaje': 'Hay datos', 'asistencias': asistencias}
            else:
                datos = {'mensaje': 'No hay datos'}

            return JsonResponse(datos)

    def post(self, request):
        jsonData = json.loads(request.body)
        valida = agregarAsistencia(
            jsonData["estadoID"], jsonData["claseID"], jsonData["rutALumno"])
        if valida == 1:
            datos = {'mensaje': 'Success'}
        else:
            datos = {'mensaje': 'No se pudo ingresar'}
        return JsonResponse(datos)

    def put(self, request, id):
        jsonData = json.loads(request.body)
        asistencia = buscarAsistencia(id)
        if len(asistencia) > 0:
            valida = modificarAsistencia(id, jsonData["estadoID"])
            if valida == 1:
                datos = {'mensaje': 'Success'}
            else:
                datos = {'mensaje': 'No se pudo actualizar'}
        else:
            datos = {'mensaje': 'No encontrado'}
        return JsonResponse(datos)

    def delete(self, request, id):
        valida = eliminarAsistencia(id)
        if valida == 1:
            datos = {'mensaje': 'Success'}
        else:
            datos = {'mensaje': 'No se pudo eliminar'}
        return JsonResponse(datos)

# Método API para GUARDAR ASISTENCIAS AUSENTES


class GuardarAsistenciaView(View):
    # Se ejecuta cada vez que queremos realizar una acción
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request):
        jsonData = json.loads(request.body)
        valida = guardarAsistencia(jsonData["claseID"], jsonData["cursoID"])
        if valida == 1:
            datos = {'mensaje': 'Success'}
        else:
            datos = {'mensaje': 'Error'}
        return JsonResponse(datos)

# Método API para iniciar sesión y modificar contraseña de usuario


class LoginView(View):
    # Se ejecuta cada vez que queremos realizar una acción
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request):
        jsonData = json.loads(request.body)
        valida, bienvenida, rut = iniciarSesion(
            jsonData["usuario"], jsonData["contrasenia"])
        if valida >= 1:
            datos = {
                'mensaje': 'Success',
                'bienvenida': bienvenida,
                'tipoUsuario': valida,
                'rut': rut
            }

        else:
            datos = {'mensaje': 'Error'}
        return JsonResponse(datos)

    def put(self, request):
        jsonData = json.loads(request.body)
        valida = cambiarContrasenia(
            jsonData["email"], jsonData["nuevaContrasenia"])
        if valida == 1:
            datos = {'mensaje': 'Success'}
        else:
            datos = {'mensaje': 'No se pudo cambiar la contraseña'}
        return JsonResponse(datos)


class CambiarContraseniaView(View):
    # Se ejecuta cada vez que queremos realizar una acción
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request):
        jsonData = json.loads(request.body)
        valida = cambiarContrasenia(
            jsonData["email"], jsonData["nuevaContrasenia"])
        if valida == 1:
            datos = {'mensaje': 'Success'}
        else:
            datos = {'mensaje': 'No se pudo cambiar la contraseña'}
        return JsonResponse(datos)


# Método API para Modificar código QR y Escanear código QR
class CodigoQRView(View):
    # Se ejecuta cada vez que queremos realizar una acción
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request):
        jsonData = json.loads(request.body)
        valida = escanearCodigoQR(jsonData["claseID"], jsonData["direccionQR"])
        if valida == 1:
            datos = {'mensaje': 'Success'}
        else:
            datos = {'mensaje': 'Escanea el código de la clase'}
        return JsonResponse(datos)

    def put(self, request):
        jsonData = json.loads(request.body)
        valida = generarCodigoQR(jsonData["claseID"], jsonData["direccionQR"])
        if valida == 1:
            datos = {'mensaje': 'Success'}
        else:
            datos = {'mensaje': 'No se pudo generar el código qr para la clase'}
        return JsonResponse(datos)


class ListarCursoProfeView(View):

    def get(self, request, rutProfesor):
        cursos = listarCursoProfe(rutProfesor)
        if len(cursos) > 0:
            datos = {'mensaje': 'Encontrado', 'cursos': cursos}
        else:
            datos = {'mensaje': 'No encontrado'}
        return JsonResponse(datos)


class ListarAsignaturaProfeView(View):

    def get(self, request, rutProfesor, cursoID):
        asignaturas = listarAsignaturaProfe(rutProfesor, cursoID)
        if len(asignaturas) > 0:
            datos = {'mensaje': 'Encontrado', 'asignaturas': asignaturas}
        else:
            datos = {'mensaje': 'No encontrado'}
        return JsonResponse(datos)


class ListarClaseProfeView(View):

    def get(self, request, rutProfesor, cursoID, asignaturaID):
        clases = listarClaseProfe(rutProfesor, cursoID, asignaturaID)
        if len(clases) > 0:
            datos = {'mensaje': 'Encontrado', 'clases': clases}
        else:
            datos = {'mensaje': 'No encontrado'}
        return JsonResponse(datos)


class ListarAsistenciaClase(View):

    def get(self, request, claseID, cursoID):
        asistencias = listarAsistenciaClase(claseID, cursoID)
        if len(asistencias) > 0:
            datos = {'mensaje': 'Encontrado', 'asistencias': asistencias}
        else:
            datos = {'mensaje': 'No encontrado'}
        return JsonResponse(datos)

# ZONA DE VISTA IONIC ALUMNO


class ListarAsignaturaAlumnoView(View):

    def get(self, request, rutAlumno):
        clases = listarAsignaturaAlumno(rutAlumno)
        if len(clases) > 0:
            datos = {'mensaje': 'Encontrado', 'asignaturas': clases}
        else:
            datos = {'mensaje': 'No encontrado'}
        return JsonResponse(datos)


class ListarClaseAlumnoView(View):

    def get(self, request, rutAlumno, asignaturaID):
        clases = listarClaseAlumno(rutAlumno, asignaturaID)
        if len(clases) > 0:
            datos = {'mensaje': 'Encontrado', 'clases': clases}
        else:
            datos = {'mensaje': 'No encontrado'}
        return JsonResponse(datos)

class EstadoAsistenciaAlumnoView(View):

    def get(self, request, rutAlumno, claseID):
        estado = buscarAsistencia2(rutAlumno, claseID)
        if estado == 1:
            datos = {'mensaje': 'Encontrado', 'estado': 'PRESENTE'}
        elif estado == 2:
            datos = {'mensaje': 'Encontrado', 'estado': 'AUSENTE'}
        elif estado == 3:
            datos = {'mensaje': 'Encontrado', 'estado': 'JUSTIFICADO'}
        else:
            datos = {'mensaje': estado}
        return JsonResponse(datos)

class MostrarPerfilUsuarioView(View):
    def get(self, request, rut):
        usuario = perfilUsuario(rut)
        if len(usuario) > 0:
            usuario = usuario[0];
            datos = {'mensaje': 'Encontrado', 'usuario': usuario}
        else:
            datos = {'mensaje': 'No encontrado'}
        return JsonResponse(datos)    

class ListarAsistenciasAsignaturaAlumnoView(View):
    def get(self, request, rutAlumno):
        asistencias = listarAsistenciaAsignatura(rutAlumno)
        if len(asistencias) > 0:
            datos = {'mensaje': 'Encontrado', 'asistencias': asistencias}
        else:
            datos = {'mensaje': 'No encontrado'}
        return JsonResponse(datos)

class ListarAsistenciasAsignaturaProfesorView(View):
    def get(self, request, rutProfesor):
        asistencias = listarAsistenciaAsignatura2(rutProfesor)
        if len(asistencias) > 0:
            datos = {'mensaje': 'Encontrado', 'asistencias': asistencias}
        else:
            datos = {'mensaje': 'No encontrado'}
        return JsonResponse(datos)

