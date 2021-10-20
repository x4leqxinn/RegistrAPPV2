from django.contrib import admin
from .models import *

# Register your models here.

# Registramos los Modelos en el Panel de administración
admin.site.register(Persona)
admin.site.register(Alumno)
admin.site.register(Usuario)
admin.site.register(Asistencia)
admin.site.register(Genero)