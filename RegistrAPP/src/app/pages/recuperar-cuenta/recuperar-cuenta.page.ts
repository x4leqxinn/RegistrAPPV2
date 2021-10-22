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
      username: new FormControl("",
        Validators.compose([
        Validators.required, // Campo requerido
        Validators.minLength(5),
        Validators.maxLength(10),
        Validators.pattern("^[[A-Z]|[a-z]][[A-Z]|[a-z]|\\d|[_]]{7,29}$") // Expresión Regular para validar el username
      ])),
    });
  }

  ngOnInit() {
  }

  buscarUsuario(username:String){
    var datos = localStorage.getItem('usuarios');
    let valida = false;
    // LISTAR
    datos = datos.replace('[','');
    datos = datos.replace(']','');
    datos = datos.split('},{').join('};{');
    var arreglo_temp = datos.split(";");
    for (let index = 0; index < arreglo_temp.length; index++) {
      var registro = arreglo_temp[index];
      var usuario = JSON.parse(registro);
      // Validamos si el usuario coincide con nuestra mini BD
      if(usuario.nombreUsuario == username){
        valida = true;
        console.log('Encontrado!')
      }
    }
    return valida;
  }

  validarIngreso(credenciales){
    if(this.buscarUsuario(credenciales.username)){
      this.toastAlert('Ingresando...','',1000);
      this.router.navigate(['/cambiar-contrasenia/',credenciales.username]);
    }else{
      this.toastAlert('ERROR', 'No es posible cambiar la contraseña.',2000);
    }
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
    get username(){ return this.recuperarForm.get('username'); }
    get password(){ return this.recuperarForm.get('password'); }
}
