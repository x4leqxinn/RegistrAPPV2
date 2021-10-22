// Importamos el componente OnInit
import { Component, OnInit} from '@angular/core';

//Importamos el componente de manejo de forms
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

// Importamos el componente NavController
import { NavController } from '@ionic/angular';

//Importamos el componente de Routers
import { Router } from '@angular/router';

// Import Toast
import { ToastController } from '@ionic/angular';

//Importamos el Alert 
import { AlertController } from '@ionic/angular';




@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.page.html',
  styleUrls: ['./iniciar-sesion.page.scss'],
})

export class IniciarSesionPage implements OnInit{

  // Creamos atributos de clase
  //nombreUsuario:String;
  //contrasenia:String;

  // Creamos un FormGroup
  loginForm: FormGroup;

    //Creamos una lista de usuarios para el login
    listaUsuarios = [
      {
        nombreUsuario: "Jorge",
        contrasenia: "RegistrAPP69!",
        tipoUsuario:2
      },
      {
        nombreUsuario: "Barbara",
        contrasenia: "RegistrAPP69!",
        tipoUsuario:2
      },
      {
        nombreUsuario: "Matias",
        contrasenia: "RegistrAPP69!",
        tipoUsuario:2
      },
      {
        nombreUsuario: "Freddy",
        contrasenia: "RegistrAPP69!",
        tipoUsuario:1
      },
    ]


  // Inicializamos el contructor con un router y un navControl
  constructor(
    private router: Router, 
    private navControl: NavController, 
    private formBuilder: FormBuilder,
    public toastController: ToastController,
    public alertController: AlertController,
    ) 
  { 
    this.loginForm = this.formBuilder.group({
      // Creamos Controles de Formularios
      username: new FormControl("",
        Validators.compose([
        Validators.required, // Campo requerido
        Validators.minLength(5),
        Validators.maxLength(10),
        Validators.pattern("^[[A-Z]|[a-z]][[A-Z]|[a-z]|\\d|[_]]{7,29}$") // Expresión Regular para validar el username
      ])),
      password: new FormControl("",
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

  ngOnInit(){
      var datos = localStorage.getItem('usuarios');
      if(datos!=null){
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
      localStorage.setItem('usuarios',JSON.stringify(lista_temporal));

      }else{
        this.guardarUsuario();      
      }

  }




    //Creación de método guardar usuario
    guardarUsuario(){
      var datos = this.listaUsuarios;
      //Guardamos en una variable de Local Storage la lista de usuarios
      localStorage.setItem('usuarios',JSON.stringify(datos));
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
    ////////////////////////////////////////
    // Funciones de alertas
    ////////////////////////////////////////

    // Alerta de confirmación
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

    // Alerta de eliminación (True, False)
    async messageAlert2(){
      const alert = await this.alertController.create({
        header:"Eliminar",
        message: "¿Estás seguro?",
        buttons: [
          {
            text:'No',
            handler:() => {
              console.log("Cancelar");
          }
        },
          {
            text:'Sí',
            handler:() => {
              console.log("Eliminada");
          }
        }
      ]
      });
      await alert.present();
      //Que se cierre cuando aprete el botón
      await alert.onDidDismiss();
    }

  limpiarCampos(){
    //Resetea Formulario
    this.loginForm.reset();
  }


  iniciarSesion(username:String, password:String){
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
      if(usuario.nombreUsuario == username && usuario.contrasenia == password){
        valida = true;
        if(usuario.tipoUsuario == 1){
          //Ingresado como profesor enviando un parametro
          this.router.navigate(['/tabs-profesor/inicio/',username]);
        }else if(usuario.tipoUsuario == 2){
          //Ingresado como alumno
          this.router.navigate(['/tabs-alumno/inicio/',username]);
        }
      }
    }
    return valida;
  }

  // Método que iniciar sesión al clickear el botón
  validarIngreso(credenciales){
    //Validamos si encontró Match
    if(this.iniciarSesion(credenciales.username, credenciales.password)){
      this.toastAlert('Ingresando ...','', 1000);
    }else{
      this.toastAlert('¡Nombre de usuario o contraseña incorrectos!','Porfavor vuelva a intentarlo.', 2000);
    }
  }

  recuperarCuenta(){
    this.router.navigate(['/recuperar-cuenta'])
    //this.router.navigate(['/codigo-qr'])
  }

  // Agrego métodos get para validar el Formulario
  get username(){ return this.loginForm.get('username'); }
  get password(){ return this.loginForm.get('password'); }

}
