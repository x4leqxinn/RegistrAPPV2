import { Injectable } from '@angular/core';

//
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})

export class AuthenGuardService {

  constructor(
    public authenticationService:AuthenticationService
  ) { 

  }

  //Método que me devuelve el estado de la autenticación
  canActivate():boolean{
    console.log("ESTADO " + this.authenticationService.isAuthenticated());
    return this.authenticationService.isAuthenticated();
  }

}
