import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { DetalleAsistenciaI } from 'src/app/components/model/detalle-asistencia.interface';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-detalle-registro',
  templateUrl: './detalle-registro.page.html',
  styleUrls: ['./detalle-registro.page.scss'],
})
export class DetalleRegistroPage implements OnInit {
  // Recibo el id de la asistencia
  id: any;
  asistencia: DetalleAsistenciaI;

  constructor
    (
      private apiService: ApiService,
      private activatedRoute: ActivatedRoute,
      private nav: NavController,
      private alertController: AlertController,
      private loadingController: LoadingController,
      private authentication: AuthenticationService
    ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.buscarAsistencia(this.id);
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

  /*
  async actualizar(){
    const carga = await this.loadingCtrl.create({
      message:"Actualizando ..."
    });
    await carga.present();
    this.personaService.updatePersona(this.persona, this.personaID).then(()=>{
      carga.dismiss();
      this.nav.navigateForward("/");
    })
  */

  /* 
      nombre: string;
  fecha:string;
  horaRegistro : string;
  estado: string;
  codigoClase:string;  */

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
