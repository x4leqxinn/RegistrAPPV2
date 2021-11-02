import { Component, OnInit } from '@angular/core';
import { PerfilUsuarioI } from 'src/app/components/model/perfil-usuario.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  // Variable del modelo perfil
  perfil: PerfilUsuarioI;

  constructor
    (private apiService: ApiService) { }

  ngOnInit() {
    this.mostrarPerfil();
  }

  mostrarPerfil() {
    if (this.obtenerRut() != null) {
      this.apiService.mostrarPerfilUsuarioGET(this.obtenerRut()).subscribe(
        (data) => {
          console.log(data);
          this.perfil = {
            rut : data.usuario[0],
            dv : data.usuario[1],
            nombre : data.usuario[2],
            email : data.usuario[3],
            usuario : data.usuario[4],
            genero : data.usuario[5]
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
