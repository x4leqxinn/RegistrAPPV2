import { Component, OnInit } from '@angular/core';
import { ResumenAsistenciaI } from 'src/app/components/model/resumen-asistencia.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-lista-asistencias',
  templateUrl: './lista-asistencias.page.html',
  styleUrls: ['./lista-asistencias.page.scss'],
})
export class ListaAsistenciasPage implements OnInit {

  asistencia: ResumenAsistenciaI;
  asistencias: ResumenAsistenciaI[] = [];

  constructor
    (
      private apiService: ApiService
    ) { }

  ngOnInit() {
    this.mostrarAsistencias();
  }

  mostrarAsistencias() {
    if (this.obtenerRut() != null) {
      this.apiService.listarAsistenciasAsignaturaProfesorGET(this.obtenerRut()).subscribe(
        (data) => {
          console.log(data);
          if (data.mensaje == 'Encontrado') {
            for (var i = 0; i < data.asistencias.length; i++) {
              this.asistencia = {
                rutAlumno: data.asistencias[i][1],
                rutProfesor: data.asistencias[i][2],
                nombreProfesor: data.asistencias[i][3],
                asignatura: data.asistencias[i][4],
                nombreAlumno: data.asistencias[i][5],
                cantidadAsistencia: data.asistencias[i][6]
              }
              this.asistencias.push(this.asistencia);
            }
          } else {
            console.log('No hay nothing');
          }
        }, //Si recupera un dato 
        (error) => {
          console.log(error);

        } // si da un error
      );
    } else {
      console.log('F');
    }
  }

  obtenerRut(): string {
    var rut = null;
    if (localStorage.getItem("dataDocente")) {
      var data = JSON.parse(localStorage.getItem("dataDocente"));
      rut = data.rut;
    } else {
      console.log("No hay data del docente");
    }
    return rut;
  }
}