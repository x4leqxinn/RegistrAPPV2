import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { PerfilUsuarioI } from 'src/app/components/model/perfil-usuario.interface';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  // Variable del modelo perfil
  perfil: PerfilUsuarioI;

  constructor
    (
      private apiService: ApiService,
      private alertController: AlertController,
      private authentication: AuthenticationService
    ) { }

  ngOnInit() {
    this.mostrarPerfil();
  }

  mostrarPerfil() {
    if (this.obtenerRut() != null) {
      this.apiService.mostrarPerfilUsuarioGET(this.obtenerRut()).subscribe(
        (data) => {
          console.log(data);
          this.perfil = {
            rut: data.usuario[0],
            dv: data.usuario[1],
            nombre: data.usuario[2],
            email: data.usuario[3],
            usuario: data.usuario[4],
            genero: data.usuario[5]
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
    if (localStorage.getItem("dataAlumno")) {
      var data = JSON.parse(localStorage.getItem("dataAlumno"));
      rut = data.rut;
    } else {
      console.log("No hay data del alumno");
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

}
