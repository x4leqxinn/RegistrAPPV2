import { Injectable } from '@angular/core';
//Implementar librerías
import { Router } from '@angular/router';
import {Storage} from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs'; //permite trabajar con procesos asincronicos


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authState = new BehaviorSubject(false);
  constructor(
    private storage:Storage,
    private platform:Platform,
    private router: Router,
  ) { }

  // Aquí debemos hacer el proceso de validación del login
  login(user, password, tipo, rut, bienvenida){

    var usuario = {
      nombre: user,
      contrasenia: password,
      tipo:tipo,
      rut:rut,
      bienvenida:bienvenida,
    };
    // FALTA VALIDAR LA NAVEGACIÓN POR TIPO DE USUARIO Y MANDAR PARAMETROS A LAS VENTANAS
    if(tipo == 1){
      this.storage.create();
      this.storage.set('user',usuario).then((resp)=>{
        console.log(usuario);
        this.router.navigate(['/tabs-profesor/inicio/',bienvenida,rut]);
        this.authState.next(true);
      })

    }else if(tipo == 2){
      this.storage.create();
      this.storage.set('user',usuario).then((resp)=>{
        console.log(usuario);
        this.router.navigate(['/tabs-alumno/inicio/',bienvenida,rut]);
        this.authState.next(true);
      })
    }

  }

  // Nos desconecta de la sesión
  logout(){
    this.storage.create();
    this.storage.remove('user').then(()=>{
      this.router.navigate(['login']);
      this.authState.next(false);
    })
  }

  isAuthenticated():boolean{
    return this.authState.value;
  }

  //Verificamos si está logeado o no
  ifLoggin(){
    this.storage.create();
    this.storage.get('user').then((response)=>{
      if(response){
        this.authState.next(true);
      }
    });
  }
}
