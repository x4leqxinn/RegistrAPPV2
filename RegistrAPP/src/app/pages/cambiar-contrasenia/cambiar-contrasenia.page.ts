import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

//
//Importamos el componente de manejo de forms
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

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
  username:any;

  //
  listaUsuarios:any;

  constructor
  (
    private router: Router, 
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private alertController:AlertController
  ) { 
    this.contraseniaForm = this.formBuilder.group({
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
    this.username = this.activatedRoute.snapshot.paramMap.get("username");
  }

  async messageAlert(titulo, mensaje){
    const alert = await this.alertController.create({
      header:titulo,
      message: mensaje,
      buttons: ["OK"],
    })
    await alert.present();
    //Que se cierre cuando aprete el botón
    await alert.onDidDismiss();
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


  agregarUsuario(nomUser:String, pass:String){
    var nuevoUser = {
        nombreUsuario: nomUser,
        contrasenia: pass,
        tipoUsuario: 2
      };
    var datos = localStorage.getItem('usuarios');
    // LISTAR
    datos = datos.replace('[','');
    datos = datos.replace(']','');
    datos = datos.split('},{').join('};{');
    var arreglo_temp = datos.split(";");
    var per;
    var lista_temporal = new Array();
    for (let index = 0; index < arreglo_temp.length; index++) {
      var registro = arreglo_temp[index];
      var usuarioGenerico = JSON.parse(registro);
      per = {
        nombreUsuario: usuarioGenerico.nombreUsuario,
        contrasenia: usuarioGenerico.contrasenia,
        tipoUsuario: usuarioGenerico.tipoUsuario
      };

      lista_temporal.push(per);
      this.listaUsuarios = lista_temporal;
    }
    
    lista_temporal.push(nuevoUser);
    this.listaUsuarios = lista_temporal;
    localStorage.setItem('usuarios',JSON.stringify(lista_temporal));
  }

  eliminarUsuario(user:String){
    var datos = localStorage.getItem('usuarios');
   // LISTAR
   datos = datos.replace('[','');
   datos = datos.replace(']','');
   datos = datos.split('},{').join('};{');
   var arreglo_temp = datos.split(";");
   var per;
   var lista_temporal = new Array();
   for (let index = 0; index < arreglo_temp.length; index++) {
     var registro = arreglo_temp[index];
     var usuarioGenerico = JSON.parse(registro);
     per = {
       nombreUsuario: usuarioGenerico.nombreUsuario,
       contrasenia: usuarioGenerico.contrasenia,
       tipoUsuario: usuarioGenerico.tipoUsuario
     };

     if(usuarioGenerico.nombreUsuario != user){
       lista_temporal.push(per);
     }
     this.listaUsuarios = lista_temporal;
     localStorage.setItem('usuarios',JSON.stringify(lista_temporal));
   }
   
 }

  validarIngreso(credenciales){
    if(credenciales.password1 == credenciales.password2 && credenciales.password2!=""){
      this.eliminarUsuario(this.username);
      this.agregarUsuario(this.username,credenciales.password1);
      this.messageAlert('¡Contraseña modificada!','');
      this.router.navigate(['/iniciar-sesion']);
    }else{
      this.toastAlert('¡Las contraseñas no coinciden!','',500);
    }
  }

    // Agrego métodos get para validar el Formulario
    get password1(){ return this.contraseniaForm.get('password1'); }
    get password2(){ return this.contraseniaForm.get('password2'); }
  
}
