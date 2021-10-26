# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class AdminInterfaceTheme(models.Model):
    name = models.CharField(unique=True, max_length=50, blank=True, null=True)
    active = models.BooleanField()
    title = models.CharField(max_length=50, blank=True, null=True)
    title_visible = models.BooleanField()
    logo = models.CharField(max_length=100, blank=True, null=True)
    logo_visible = models.BooleanField()
    css_header_background_color = models.CharField(max_length=10, blank=True, null=True)
    title_color = models.CharField(max_length=10, blank=True, null=True)
    css_header_text_color = models.CharField(max_length=10, blank=True, null=True)
    css_header_link_color = models.CharField(max_length=10, blank=True, null=True)
    css_header_link_hover_color = models.CharField(max_length=10, blank=True, null=True)
    css_module_background_color = models.CharField(max_length=10, blank=True, null=True)
    css_module_text_color = models.CharField(max_length=10, blank=True, null=True)
    css_module_link_color = models.CharField(max_length=10, blank=True, null=True)
    css_module_link_hover_color = models.CharField(max_length=10, blank=True, null=True)
    css_module_rounded_corners = models.BooleanField()
    css_generic_link_color = models.CharField(max_length=10, blank=True, null=True)
    css_generic_link_hover_color = models.CharField(max_length=10, blank=True, null=True)
    css_save_button_background5185 = models.CharField(max_length=10, blank=True, null=True)
    css_save_button_backgroundd677 = models.CharField(max_length=10, blank=True, null=True)
    css_save_button_text_color = models.CharField(max_length=10, blank=True, null=True)
    css_delete_button_backgroucea0 = models.CharField(max_length=10, blank=True, null=True)
    css_delete_button_backgrou6352 = models.CharField(max_length=10, blank=True, null=True)
    css_delete_button_text_color = models.CharField(max_length=10, blank=True, null=True)
    css = models.TextField(blank=True, null=True)
    list_filter_dropdown = models.BooleanField()
    related_modal_active = models.BooleanField()
    related_modal_background_color = models.CharField(max_length=10, blank=True, null=True)
    related_modal_rounded_corners = models.BooleanField()
    logo_color = models.CharField(max_length=10, blank=True, null=True)
    recent_actions_visible = models.BooleanField()
    favicon = models.CharField(max_length=100, blank=True, null=True)
    related_modal_background_o7c6e = models.CharField(max_length=5, blank=True, null=True)
    env_name = models.CharField(max_length=50, blank=True, null=True)
    env_visible_in_header = models.BooleanField(blank=True, null=True)
    env_color = models.CharField(max_length=10, blank=True, null=True)
    env_visible_in_favicon = models.BooleanField()
    related_modal_close_button8203 = models.BooleanField()
    language_chooser_active = models.BooleanField()
    language_chooser_display = models.CharField(max_length=10, blank=True, null=True)
    list_filter_sticky = models.BooleanField()
    form_pagination_sticky = models.BooleanField()
    form_submit_sticky = models.BooleanField()
    css_module_background_selec21b = models.CharField(max_length=10, blank=True, null=True)
    css_module_link_selected_color = models.CharField(max_length=10, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'admin_interface_theme'


class Alumno(models.Model):
    rut_alumno = models.OneToOneField('Persona', models.DO_NOTHING, db_column='rut_alumno', primary_key=True)
    id_curso = models.ForeignKey('Curso', models.DO_NOTHING, db_column='id_curso')

    class Meta:
        managed = False
        db_table = 'alumno'


class Asignatura(models.Model):
    id_asignatura = models.IntegerField(primary_key=True)
    descripcion = models.CharField(max_length=40)

    class Meta:
        managed = False
        db_table = 'asignatura'


class Asistencia(models.Model):
    id_asistencia = models.IntegerField(primary_key=True)
    fecha = models.DateField()
    hora = models.CharField(max_length=8)
    id_estado = models.ForeignKey('EstadoAsistencia', models.DO_NOTHING, db_column='id_estado')

    class Meta:
        managed = False
        db_table = 'asistencia'


class AuditoriaDdl(models.Model):
    correlativo = models.IntegerField(primary_key=True)
    usuario = models.CharField(max_length=30)
    objeto_afectado = models.CharField(max_length=80)
    nombre_objeto = models.CharField(max_length=200)
    operacion = models.CharField(max_length=30)
    fecha = models.DateField()
    hora = models.CharField(max_length=10)

    class Meta:
        managed = False
        db_table = 'auditoria_ddl'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128, blank=True, null=True)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150, blank=True, null=True)
    first_name = models.CharField(max_length=150, blank=True, null=True)
    last_name = models.CharField(max_length=150, blank=True, null=True)
    email = models.CharField(max_length=254, blank=True, null=True)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class Clase(models.Model):
    id_clase = models.IntegerField(primary_key=True)
    fecha = models.DateField()
    hora_inicio = models.CharField(max_length=10)
    hora_termino = models.CharField(max_length=10)
    id_asignatura = models.ForeignKey(Asignatura, models.DO_NOTHING, db_column='id_asignatura')
    codigo_qr = models.CharField(max_length=100, blank=True, null=True)
    rut_profesor = models.ForeignKey('Profesor', models.DO_NOTHING, db_column='rut_profesor')
    id_curso = models.ForeignKey('Curso', models.DO_NOTHING, db_column='id_curso')

    class Meta:
        managed = False
        db_table = 'clase'


class Curso(models.Model):
    id_curso = models.IntegerField(primary_key=True)
    descripcion = models.CharField(max_length=50)
    rut_profesor = models.ForeignKey('Profesor', models.DO_NOTHING, db_column='rut_profesor')

    class Meta:
        managed = False
        db_table = 'curso'


class DetalleAsignatura(models.Model):
    id_detalle_asignatura = models.IntegerField(primary_key=True)
    rut_profesor = models.ForeignKey('Profesor', models.DO_NOTHING, db_column='rut_profesor')
    id_asignatura = models.ForeignKey(Asignatura, models.DO_NOTHING, db_column='id_asignatura')

    class Meta:
        managed = False
        db_table = 'detalle_asignatura'


class DetalleAsistencia(models.Model):
    id_detalle_asist = models.IntegerField(primary_key=True)
    id_asistencia = models.ForeignKey(Asistencia, models.DO_NOTHING, db_column='id_asistencia')
    id_clase = models.ForeignKey(Clase, models.DO_NOTHING, db_column='id_clase')
    rut_alumno = models.ForeignKey(Alumno, models.DO_NOTHING, db_column='rut_alumno')

    class Meta:
        managed = False
        db_table = 'detalle_asistencia'


class DetalleCurso(models.Model):
    id_detalle_curso = models.IntegerField(primary_key=True)
    rut_profesor = models.ForeignKey('Profesor', models.DO_NOTHING, db_column='rut_profesor')
    id_curso = models.ForeignKey(Curso, models.DO_NOTHING, db_column='id_curso')

    class Meta:
        managed = False
        db_table = 'detalle_curso'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200, blank=True, null=True)
    action_flag = models.IntegerField()
    change_message = models.TextField(blank=True, null=True)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100, blank=True, null=True)
    model = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255, blank=True, null=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField(blank=True, null=True)
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class EstadoAsistencia(models.Model):
    id_estado = models.IntegerField(primary_key=True)
    descripcion = models.CharField(max_length=20)

    class Meta:
        managed = False
        db_table = 'estado_asistencia'


class EstadoUsuario(models.Model):
    id_estado = models.IntegerField(primary_key=True)
    descripcion = models.CharField(max_length=15)

    class Meta:
        managed = False
        db_table = 'estado_usuario'


class Genero(models.Model):
    id_genero = models.IntegerField(primary_key=True)
    descripcion = models.CharField(max_length=10)

    class Meta:
        managed = False
        db_table = 'genero'


class Persona(models.Model):
    rut = models.CharField(primary_key=True, max_length=12)
    dv = models.CharField(max_length=1)
    nombre = models.CharField(max_length=40)
    nombre_s = models.CharField(max_length=40)
    nombre_t = models.CharField(max_length=40, blank=True, null=True)
    apellido_p = models.CharField(max_length=40)
    apellido_m = models.CharField(max_length=40)
    email = models.CharField(max_length=100)
    nombre_usuario = models.ForeignKey('Usuario', models.DO_NOTHING, db_column='nombre_usuario')
    id_genero = models.ForeignKey(Genero, models.DO_NOTHING, db_column='id_genero')

    class Meta:
        managed = False
        db_table = 'persona'


class Profesor(models.Model):
    rut_profesor = models.OneToOneField(Persona, models.DO_NOTHING, db_column='rut_profesor', primary_key=True)
    sueldo = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'profesor'


class RegistroError(models.Model):
    id = models.IntegerField(primary_key=True)
    codigo_error = models.CharField(max_length=30)
    mensaje_error = models.CharField(max_length=300)
    subprograma = models.CharField(max_length=80)
    fecha = models.DateField()
    hora = models.CharField(max_length=10)

    class Meta:
        managed = False
        db_table = 'registro_error'


class RegistroLogs(models.Model):
    correlativo = models.IntegerField(primary_key=True)
    operacion = models.CharField(max_length=15)
    mensaje = models.CharField(max_length=100)
    fecha = models.DateField()
    hora = models.CharField(max_length=10)

    class Meta:
        managed = False
        db_table = 'registro_logs'


class ResumenAsistencia(models.Model):
    id_resumen = models.IntegerField(primary_key=True)
    rut_alumno = models.CharField(max_length=12)
    rut_profesor = models.CharField(max_length=12)
    profesor = models.CharField(max_length=150)
    asignatura = models.CharField(max_length=40)
    alumno = models.CharField(max_length=150)
    cant_asistencia = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'resumen_asistencia'


class TipoUsuario(models.Model):
    id_tipo = models.IntegerField(primary_key=True)
    descripcion = models.CharField(max_length=20)

    class Meta:
        managed = False
        db_table = 'tipo_usuario'


class Usuario(models.Model):
    nombre_usuario = models.CharField(primary_key=True, max_length=40)
    contrasenia = models.CharField(max_length=25)
    id_estado = models.ForeignKey(EstadoUsuario, models.DO_NOTHING, db_column='id_estado')
    id_tipo = models.ForeignKey(TipoUsuario, models.DO_NOTHING, db_column='id_tipo')

    class Meta:
        managed = False
        db_table = 'usuario'
