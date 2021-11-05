import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { DetalleAsistenciaI } from 'src/app/components/model/detalle-asistencia.interface';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { EstadoI } from 'src/app/components/model/estado.interface';
import { EstadoI2 } from 'src/app/components/model/estado2.interfase';
@Component({
  selector: 'app-detalle-registro',
  templateUrl: './detalle-registro.page.html',
  styleUrls: ['./detalle-registro.page.scss'],
})
export class DetalleRegistroPage implements OnInit {
  // Recibo el id de la asistencia
  id: any;
  asistencia: DetalleAsistenciaI;
  // Variable que guarda el valor seleccionado y que por defecto sea el del estado actual de asistencia del alumno
  valorSeleccionado: string;

  //
  estado: EstadoI;

  estadoM: EstadoI2; //Modificar

  estados: EstadoI[] = [];


  constructor
    (
      private apiService: ApiService,
      private activatedRoute: ActivatedRoute,
      private nav: NavController,
      private alertController: AlertController,
      private loadingController: LoadingController,
      private authentication: AuthenticationService,
      private toastController: ToastController
    ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.listarEstadosAsistencia();
    this.buscarAsistencia(this.id);
  }

  listarEstadosAsistencia() {
    this.apiService.listarEstadosAsistenciaGET().subscribe(
      (data) => {
        console.log(data);
        for (let i = 0; i < data.estados.length; i++) {
          // Rellenamos el estado
          this.estado = {
            id: data.estados[i][0],
            nombre: data.estados[i][1]
          }

          this.estados.push(this.estado);
        }
      }, //Si recupera un dato 
      (error) => {
        console.log(error);
      } // si da un error
    );
  }

  buscarAsistencia(id) {
    this.apiService.buscarAsistenciaGET(id).subscribe(
      (data) => {
        console.log(data);
        // Rellenamos la asistencia
        this.asistencia = {
          id: data.asistencia[0],
          asignatura: data.asistencia[1],
          fechaClase: data.asistencia[2],
          horaInicio: data.asistencia[3],
          horaTermino: data.asistencia[4],
          estado: data.asistencia[5],
          fechaRegistro: data.asistencia[6],
          horaRegistro: data.asistencia[7],
          rut: data.asistencia[8],
          nombre: data.asistencia[9],
          curso: data.asistencia[10]
        }

        this.valorSeleccionado = this.asistencia.estado;

      }, //Si recupera un dato 
      (error) => {
        console.log(error);
      } // si da un error
    );

  }

  async eliminar(id) {
    const carga = await this.loadingController.create({
      message: "Guardando asistencias"
    });

    await carga.present();

    this.apiService.eliminarAsistenciaDELETE(id).subscribe(
      (success) => {
        console.log(success);
        carga.dismiss();
        this.messageAlert("¡Éxito!", "¡Se ha eliminado la asistencia con éxito!");
        this.nav.navigateForward('tabs-profesor/home');
        //this.nav.navigateBack("/");
      },
      (e) => {
        console.log(e);
        carga.dismiss();
        this.messageAlert('¡Lo sentimos!', 'EL servicio no se encuentra disponible en este momento, vuelva más tarde.');
      }
    );

  }



  // Alerta de eliminación (True, False)
  async eliminarAsistencia(id) {
    const alert = await this.alertController.create({
      header: "Eliminar Asistencia",
      message: "¿Estás seguro?",
      buttons: [
        {
          text: 'Sí',
          handler: () => {
            console.log("Eliminado");
            this.eliminar(id);
            this.aplicarSonido();
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

  aplicarSonido(): void {
    const audio = new Audio();
    audio.src = '../assets/sounds/EliminarAsistencia.mp3';
    audio.load();
    audio.play();
  }


  async actualizar(id) {
    const carga = await this.loadingController.create({
      message: "Actualizando ..."
    });
    await carga.present();

    var estadoID = this.validarEstado(this.valorSeleccionado);
    
    this.estadoM = {
      estadoID: estadoID,
    }

    this.apiService.modificarAsistenciaPUT(id, this.estadoM).subscribe(
      (success) => {
        console.log(success);
        carga.dismiss();
        this.messageAlert("¡Éxito!", "¡Se ha actualizado la asistencia con éxito!");
        this.nav.navigateForward('tabs-profesor/home');
        //this.nav.navigateBack("/");
      },
      (e) => {
        console.log(e);
        carga.dismiss();
        this.messageAlert('¡Lo sentimos!', 'EL servicio no se encuentra disponible en este momento, vuelva más tarde.');
      }
    );
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


  validarEstado(estado):number{
    var valida = 0;
    if (estado == 'PRESENTE') {
      valida = 1;
    } else if (estado == 'AUSENTE') {
      valida = 2;
    } else if (estado == 'JUSTIFICADO') {
      valida = 3;
    }
    return valida;
  }

  // Mandar un toast al seleccionar un valor del Radio Button
 
  /*
  valorCambiado(){
    // Método que captura el valor seleccionado actual del radio button
    this.invocar(this.valorSeleccionado,"",3000);
  }
  */

}
