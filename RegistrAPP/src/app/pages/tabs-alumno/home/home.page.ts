import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  inicio : any;
  constructor
  (
    private alertController: AlertController,
    private authentication: AuthenticationService
  )
  { }

  ngOnInit() {
    this.bienvenida();
  }

  bienvenida() {
    //Obtener data del Local Storage
    if (localStorage.getItem('bienvenida')) {
      // Si existe haga esto
      this.inicio = localStorage.getItem('bienvenida');
    } else {
      // No hay datos en el Local Storage
      console.log('Error no hay datos en el Local Storage');
    }
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


