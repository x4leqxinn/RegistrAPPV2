import { Component, OnInit } from '@angular/core';
// Importamos el servicio de Autenticación
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-tabs-profesor',
  templateUrl: './tabs-profesor.page.html',
  styleUrls: ['./tabs-profesor.page.scss'],
})
export class TabsProfesorPage implements OnInit {

  parametro: any = { claseID: 3 }

  constructor
    (
      private authenticationService: AuthenticationService,
      private mensaje: AlertController,
      private navParams: NavParams
    ) {
      console.log("parametro id " + this.navParams.get("claseID"));
     }

  ngOnInit() {
  }

  cerrarSesion() {
    this.mensajeCerrarSesion();
  }


  async mensajeCerrarSesion() {
    const alert = await this.mensaje.create({
      header: "Cerrar sesión",
      message: "¿Estás seguro?",
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log("Cancelar");

          }
        },
        {
          text: 'Sí',
          handler: () => {
            console.log("Sesión finalizada");
            //Cierra la sesión del usuario actual
            this.authenticationService.logout();
          }
        }
      ]
    });
    await alert.present();
    //Que se cierre cuando aprete el botón
    await alert.onDidDismiss();
  }

}
