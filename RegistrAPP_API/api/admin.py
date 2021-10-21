from django.contrib import admin
from .models import *

# Register your models here.

# Modelo Formato de vista en el Panel de Admin
class PersonaAdmin(admin.ModelAdmin):
    list_display = ["rut", "dv","nombre","apellido_p"] # valores que quiero que se presenten
    list_editable = ["nombre","apellido_p"] # valores que quiero que se puedan editar 
    search_fields = ["nombre"] # buscar por dichos campos
    list_filter = ["nombre"] # filtrar por dichos campos
    list_per_page = 5 # Paginación registros por página

# Registramos los Modelos en el Panel de administración
admin.site.register(Persona, PersonaAdmin)
admin.site.register(Alumno)
admin.site.register(Usuario)
admin.site.register(Asistencia)
admin.site.register(Genero)