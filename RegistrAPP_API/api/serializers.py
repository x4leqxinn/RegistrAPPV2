# Serializamos la información de mis modelos
# Importamos las tablas
from .models import *
# importamos SERIALIZERS 
from rest_framework import serializers


class AlumnoSerializers(serializers.ModelSerializer):
    class Meta:
        model = Persona
        fields = ["nombre"] # '__all__'

