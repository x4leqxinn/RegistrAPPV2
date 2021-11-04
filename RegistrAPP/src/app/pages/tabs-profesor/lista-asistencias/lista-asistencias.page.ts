import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ResumenAsistenciaI } from 'src/app/components/model/resumen-asistencia.interface';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

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
      private apiService: ApiService,
      private authentication: AuthenticationService,
      private alertController: AlertController,
      private toastController : ToastController      
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

  async cerrarSesion() {
    const alert = await this.alertController.create({
      header: "Cerrar sesión",
      message: "¿Estás seguro?",
      buttons: [
        {
          text: 'Sí',
          handler: () => {
            console.log("Sesión finalizada");
            this.authentication.logout();
          }
        },
        {
          text: 'No',
          handler: () => {
            console.log("Cancelar");
          }
        }
      ]
    });
    await alert.present();
    //Que se cierre cuando aprete el botón
    await alert.onDidDismiss();
  }

  detalleResumen(cantidad, asignatura) {
    this.mostrarToast(asignatura,"Cantidad de asistencias " + cantidad, 2000);
  }

  async mostrarToast(titulo:string, mensaje:string, duracion:number){
    let toast = await this.toastController.create({
      header: titulo,
      message: mensaje,
      duration: duracion,
      position: 'top',
      animated: true,
      translucent: false,
      //showCloseButton: true
      //closeBttonText: "Cerrar"
    });
    toast.present();
  }
}