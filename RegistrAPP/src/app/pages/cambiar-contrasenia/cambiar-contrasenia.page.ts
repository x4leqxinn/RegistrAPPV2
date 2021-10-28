import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

//
//Importamos el componente de manejo de forms
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

//

@Component({
  selector: 'app-cambiar-contrasenia',
  templateUrl: './cambiar-contrasenia.page.html',
  styleUrls: ['./cambiar-contrasenia.page.scss'],
})
export class CambiarContraseniaPage implements OnInit {
  //
  contraseniaForm: FormGroup;


  //
  listaUsuarios: any;

  constructor
    (
      private router: Router,
      private formBuilder: FormBuilder,
      private toastController: ToastController,
      private activatedRoute: ActivatedRoute,
      private alertController: AlertController,
      private apiService: ApiService
    ) {
    this.contraseniaForm = this.formBuilder.group({
      email: new FormControl("",
        Validators.compose([
          Validators.required, // Campo requerido
          Validators.minLength(10),
          Validators.maxLength(80),
          Validators.pattern("[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})") // Expresión Regular para validar el Email
        ])),
      // Creamos Controles de Formularios
      password1: new FormControl("",
        Validators.compose([
          Validators.required, // Campo requerido
          Validators.minLength(8),
          Validators.maxLength(20),
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')// Expresión Regular para validar el password
        ])),
      password2: new FormControl("",
        Validators.compose([
          Validators.required, // Campo requerido
          Validators.minLength(8),
          Validators.maxLength(20),
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')// Expresión Regular para validar el password
          /* 
            La pass debe 
            Minimo 8 caracteres
            Al menos una letra mayúscula
            Al menos una letra minuscula
            Al menos un dígito
            Al menos 1 caracter especial
          */
        ]))
    });
  }

  ngOnInit() {
    //this.email = this.activatedRoute.snapshot.paramMap.get("email");
  }

  async messageAlert(titulo, mensaje) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ["OK"],
    })
    await alert.present();
    //Que se cierre cuando aprete el botón
    await alert.onDidDismiss();
  }


  // Función asincróna para personalizar mi Toast e invocarlo
  async toastAlert(titulo, mensaje, duracion) {
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


  cambiarContrasenia(credenciales){
    if(this.validarContrasenias(credenciales)){
      // Enviamos un diccionario
      var usuario = {
        email: credenciales.email,
        nuevaContrasenia: credenciales.password1,
      };
      this.apiService.cambiarContraseniaPUT(usuario).subscribe(
        (data) => {
          console.log(data);
          this.messageAlert("¡Éxito!","¡La contraseña ha sido modificada con éxito!");
          this.router.navigate(['/iniciar-sesion']);
        },
        (error) => {
          console.log(error);
          // Aquí podría poner una alerta de que las credenciales son incorrectas
          this.messageAlert("¡ERROR!","¡No se pudo modificar la contraseña!");
        }
      );
    }else{
      this.messageAlert("¡ERROR!","¡Las contraseñas no coinciden!");
    }
  }



  validarContrasenias(credenciales):boolean{
    var valida = false;
    if(credenciales.password1 == credenciales.password2 && credenciales.password2!=""){
      //this.router.navigate(['/iniciar-sesion']);
      valida = true;
    }
    return valida;
  }

  // Agrego métodos get para validar el Formulario
  get email(){ return this.contraseniaForm.get('email'); }
  get password1() { return this.contraseniaForm.get('password1'); }
  get password2() { return this.contraseniaForm.get('password2'); }

}
