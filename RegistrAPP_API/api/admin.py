from django.contrib import admin
from .models import *

# Register your models here.

# Modelo Formato de vista en el Panel de Admin
class PersonaAdmin(admin.ModelAdmin):
    list_display = ["rut", "dv","nombre","nombre_s" ,"apellido_p","apellido_m", "email", "nombre_usuario", "id_genero"] # valores que quiero que se presenten
    list_editable = ["nombre", "nombre_s", "apellido_p", "apellido_m", "email"] # valores que quiero que se puedan editar 
    search_fields = ["rut","nombre"] # buscar por dichos campos
    list_filter = ["id_genero"] # filtrar por dichos campos
    list_per_page = 5 # Paginación registros por página

class UsuarioAdmin(admin.ModelAdmin):
    list_display = ["nombre_usuario", "id_estado","id_tipo"] # valores que quiero que se presenten
    list_editable = ["id_estado","id_tipo"] # valores que quiero que se puedan editar 
    search_fields = ["nombre_usuario","id_estado","id_tipo"] # buscar por dichos campos
    list_filter = ["id_tipo", "id_estado"] # filtrar por dichos campos
    list_per_page = 5 # Paginación registros por página    

class TipoUsuarioAdmin(admin.ModelAdmin):
    list_display = ["id_tipo", "descripcion"] # valores que quiero que se presenten
    search_fields = ["id_tipo","descripcion"] # buscar por dichos campos
    list_filter = ["id_tipo"] # filtrar por dichos campos
    list_per_page = 2 # Paginación registros por página   

class GeneroAdmin(admin.ModelAdmin):
    list_display = ["id_genero", "descripcion"] # valores que quiero que se presenten
    search_fields = ["id_genero","descripcion"] # buscar por dichos campos
    list_filter = ["id_genero"] # filtrar por dichos campos
    list_per_page = 2 # Paginación registros por página   

class EstadoUsuarioAdmin(admin.ModelAdmin):
    list_display = ["id_estado", "descripcion"] # valores que quiero que se presenten
    search_fields = ["id_estado","descripcion"] # buscar por dichos campos
    list_filter = ["id_estado"] # filtrar por dichos campos
    list_per_page = 2 # Paginación registros por página   

# Registramos los Modelos en el Panel de administración
admin.site.register(Persona, PersonaAdmin)
admin.site.register(Usuario, UsuarioAdmin)
admin.site.register(TipoUsuario, TipoUsuarioAdmin)
admin.site.register(Asistencia)
admin.site.register(Genero, GeneroAdmin)
admin.site.register(Asignatura)
admin.site.register(Curso)
admin.site.register(EstadoUsuario,EstadoUsuarioAdmin)
admin.site.register(EstadoAsistencia)