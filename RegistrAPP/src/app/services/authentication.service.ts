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

  login(){
    var objeto = {
      user_name: 'Jorge',
      user_pass: 'RegistrAPP69!'
    };

    this.storage.create();
    this.storage.set('user',objeto).then((resp)=>{
      console.log(objeto);
      this.router.navigate(['inicio']);
      this.authState.next(true);
    })
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
