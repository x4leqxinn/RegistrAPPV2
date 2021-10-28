import { Component, OnInit } from '@angular/core';

//
//Importamos el componente de manejo de forms
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

//

@Component({
  selector: 'app-recuperar-cuenta',
  templateUrl: './recuperar-cuenta.page.html',
  styleUrls: ['./recuperar-cuenta.page.scss'],
})
export class RecuperarCuentaPage implements OnInit {

  // Creamos un FormGroup
  recuperarForm: FormGroup;

  constructor
  (    
    private router: Router, 
    private formBuilder: FormBuilder,
    private toastController: ToastController
  ) { 
    this.recuperarForm = this.formBuilder.group({

      // Creamos Controles de Formularios
      email: new FormControl("",
        Validators.compose([
        Validators.required, // Campo requerido
        Validators.minLength(10),
        Validators.maxLength(80),
        Validators.pattern("[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})") // Expresión Regular para validar el Email
      ])),
    });
  }

  ngOnInit() {
  }

  buscarUsuario(){
  }

  validarIngreso(credenciales){
    /*
    if(this.buscarUsuario(credenciales.username)){
      this.toastAlert('Ingresando...','',1000);
      this.router.navigate(['/cambiar-contrasenia/',credenciales.username]);
    }else{
      this.toastAlert('ERROR', 'No es posible cambiar la contraseña.',2000);
    }
    */
  }

  
    // Función asincróna para personalizar mi Toast e invocarlo
    async toastAlert(titulo, mensaje, duracion){
      const toast = await this.toastController.create({
        header: titulo,
        message: mensaje,
        duration: duracion,
        position: 'top',
        animated: true,
        translucent: false
      });
      toast.present();
    }

    // Agrego métodos get para validar el Formulario
    get email(){ return this.recuperarForm.get('email'); }

}
