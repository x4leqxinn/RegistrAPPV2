import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { RegistroAsistenciaI } from 'src/app/components/model/registro-asistencia.interface';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-registrar-asistencia',
  templateUrl: './registrar-asistencia.page.html',
  styleUrls: ['./registrar-asistencia.page.scss'],
})
export class RegistrarAsistenciaPage implements OnInit {
  // Modelo
  asistencia: RegistroAsistenciaI;
  asistencias: RegistroAsistenciaI[] = [];

  constructor
    (
      private apiService: ApiService,
      private loadingController: LoadingController,
      private alertController: AlertController,
      private toastController: ToastController,
      private router: Router,
      private authentication : AuthenticationService,
    ) { }

  ngOnInit() { }

  /*
    ionViewWillEnter(){
      this.listarAsistencias();
    }
  */

  // Método que se ejecuta cada vez que se entra a esta vista
  ionViewDidEnter() {
    this.listarAsistencias();
  }

  async listarAsistencias() {
    this.asistencias = []
    if (localStorage.getItem('dataDocente')) {
      var datos = JSON.parse(localStorage.getItem('dataDocente'));
      const carga = await this.loadingController.create({
        message: "Cargando asistencias"
      });

      await carga.present();

      this.apiService.listarAsistenciaClaseGET(datos.claseID, datos.cursoID).subscribe(
        (data) => {
          console.log(data);
          if (data.mensaje == 'Encontrado') {
            for (var i = 0; i < data.asistencias.length; i++) {

              // Creo un objeto de tipo Registro Asistencia
              this.asistencia = {
                id: data.asistencias[i][0],
                rut: data.asistencias[i][1],
                nombre: data.asistencias[i][2],
                fecha: data.asistencias[i][3],
                horaRegistro: data.asistencias[i][4],
                estado: data.asistencias[i][5],
                codigoClase: data.asistencias[i][6]
              }
              // Lo agrego  a mi Array de ASISTENCIAS
              this.asistencias.push(this.asistencia);
            }
            carga.dismiss();
          } else {
            // No encontró resultados Mensaje
            carga.dismiss();
          }
        },
        (error) => {
          console.log(error);
          carga.dismiss();
          // Mensaje de error se cayó el server
          this.messageAlert('¡Lo sentimos!', 'EL servicio no se encuentra disponible en este momento, vuelva más tarde.');
        }
      );
    } else {
      // No hay info en el Local
    }
  }

  async guardarAsistencia() {
    this.asistencias = []

    const carga = await this.loadingController.create({
      message: "Guardando asistencias"
    });

    await carga.present();

    if (localStorage.getItem('dataDocente')) {
      var guardar = JSON.parse(localStorage.getItem('dataDocente'));
      this.apiService.guardarAsistenciaPOST(guardar).subscribe(
        (data) => {
          console.log(data);
          carga.dismiss();
          this.messageAlert("¡Éxito!", "¡Se ha guardado la asistencia de la clase con éxito!");
          this.listarAsistencias();
        },
        (error) => {
          console.log(error);
          carga.dismiss();
          this.messageAlert('¡Error!', 'EL servicio no se encuentra disponible en este momento, vuelva más tarde.');
          //          this.toastAlert('¡Error!', 'EL servicio no se encuentra disponible en este momento, vuelva más tarde.', '2000');
        }
      );

    } else {
      // No hay datos en el local storage
    }
  }

  async messageAlert(titulo, mensaje) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ["OK"],
    })
    await alert.present();
    //Que se cierre cuando aprete el botón
    await alert.onDidDismiss();
  }


  // Función asincróna para personalizar mi Toast e invocarlo
  async toastAlert(titulo, mensaje, duracion) {
    const toast = await this.toastController.create({
      header: titulo,
      message: mensaje,
      duration: duracion,
      position: 'top',
      animated: true,
      translucent: false
    });
    toast.present();
  }

  detalleRegistro(id) {
    this.router.navigate(['tabs-profesor/detalle-registro/', id]);
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
}
