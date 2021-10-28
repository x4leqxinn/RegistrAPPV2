import { Component, OnInit } from '@angular/core';
//
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tabs-alumno',
  templateUrl: './tabs-alumno.page.html',
  styleUrls: ['./tabs-alumno.page.scss'],
})
export class TabsAlumnoPage implements OnInit {

  constructor(
    private authenticationService : AuthenticationService,
    private mensaje : AlertController
  ) { }

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
