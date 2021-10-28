import { Component } from '@angular/core';

//Importar rutas
import { Router } from '@angular/router';

// Importamos el Servicio de Autenticación
import { AuthenticationService } from './services/authentication.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  ////////////////////////
  //Falta Recibir el Nombre del Usuario como parámetro
  ///////////////////////
  
  constructor
  (
    private router:Router,
    private platform:Platform,
    private authService:AuthenticationService
  ) 
  {
    //Si la plataforma está lista que haga lo siguiente
    platform.ready().then(()=>{
      // Va a estar a atento en cada momento de lo que ocurra en estado
      authService.authState.subscribe(estado=>{
        if(estado){
          // Mientras el estado sea true estaré logeado, si no me devúelve al login
        }else{
          router.navigate(['/iniciar-sesion']);
        }
      });
    });
  }

}