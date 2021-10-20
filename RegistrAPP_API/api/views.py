from django.shortcuts import render
# Importamos la librería para conectarnos a ORACLE
from django.db import connection
import cx_Oracle
# Create your views here.

# Aquí realizamos los métodos para el Backend
def alumnos(request):
    print(listarAlumnos())
    return render(request,'core/alumnos.html')

def listarAlumnos():
    django_cursor = connection.cursor()
    cursor = django_cursor.connection.cursor() # Llama al SP
    out_cursor = django_cursor.connection.cursor() # Recibe los datos
    valida = cursor.var(cx_Oracle.NUMBER)

    cursor.callproc("PKG_ALUMNO.SP_LISTAR_ALUMNO",[out_cursor,valida]);
    # Recibimos el cursor y lo transformamos a una lista
    lista = []
    for fila in out_cursor:
        lista.append(fila)
    return lista