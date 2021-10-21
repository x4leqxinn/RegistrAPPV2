# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Alumno(models.Model):
    rut_alumno = models.OneToOneField('Persona', models.DO_NOTHING, db_column='rut_alumno', primary_key=True)

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


class Clase(models.Model):
    id_clase = models.IntegerField(primary_key=True)
    fecha = models.DateField()
    hora_inicio = models.CharField(max_length=10)
    hora_termino = models.CharField(max_length=10)
    id_asignatura = models.ForeignKey(Asignatura, models.DO_NOTHING, db_column='id_asignatura')
    codigo_qr = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'clase'


class Curso(models.Model):
    id_curso = models.IntegerField(primary_key=True)
    descripcion = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'curso'


class DetalleAsistencia(models.Model):
    id_detalle_asist = models.IntegerField(primary_key=True)
    id_asistencia = models.ForeignKey(Asistencia, models.DO_NOTHING, db_column='id_asistencia')
    id_clase = models.ForeignKey(Clase, models.DO_NOTHING, db_column='id_clase')

    class Meta:
        managed = False
        db_table = 'detalle_asistencia'


class DetalleClaseAlu(models.Model):
    id_det_clase_alu = models.AutoField(primary_key=True)
    id_clase = models.ForeignKey(Clase, models.DO_NOTHING, db_column='id_clase')
    rut_alumno = models.ForeignKey(Alumno, models.DO_NOTHING, db_column='rut_alumno')

    class Meta:
        managed = False
        db_table = 'detalle_clase_alu'

#Cambiamos el valor de Float a AutoField
class DetalleClaseProfe(models.Model):
    id_det_clase_profe = models.AutoField(primary_key=True)
    id_clase = models.ForeignKey(Clase, models.DO_NOTHING, db_column='id_clase')
    rut_profesor = models.ForeignKey('Profesor', models.DO_NOTHING, db_column='rut_profesor')

    class Meta:
        managed = False
        db_table = 'detalle_clase_profe'


class DetalleCurso(models.Model):
    id_detalle_curso = models.AutoField(primary_key=True)
    id_clase = models.ForeignKey(Clase, models.DO_NOTHING, db_column='id_clase')
    id_curso = models.ForeignKey(Curso, models.DO_NOTHING, db_column='id_curso')

    class Meta:
        managed = False
        db_table = 'detalle_curso'


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


class ResumenAsistencia(models.Model):
    id_resumen = models.IntegerField(primary_key=True)
    rut_alumno = models.IntegerField()
    rut_profesor = models.IntegerField()
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
