import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

//
import { Usuario } from '../../components/model/usuario.intefaces';

//import
import { AlertasToast } from 'src/app/components/ts/alertas/toast';
import { Mensaje } from 'src/app/components/ts/alertas/mensaje-alerta';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthenticationService, private tostada:AlertasToast, private msj: Mensaje) { }
  //Objeto de tipo usuario de modelo
  usuario: Usuario={
    nombre:'',
    pass:''
  }

  ngOnInit() {
  }

  loginUser(){
    //Manejo de angular
    if(this.usuario.nombre == "jorge" && this.usuario.pass == "admin"){
      this.authService.login();
    }else{
      alert("Credenciales incorrectas");
    }
  }
}
