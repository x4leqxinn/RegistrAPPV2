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

//Importamos AuthenticationService
import { AuthenticationService } from 'src/app/services/authentication.service';

// Importamos el API SERVICE
import { ApiService } from 'src/app/services/api.service';




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

  // Inicializamos el contructor con un router y un navControl
  constructor(
    private router: Router, 
    private navControl: NavController, 
    private formBuilder: FormBuilder,
    public toastController: ToastController,
    public alertController: AlertController,
    private authService: AuthenticationService,
    private apiService: ApiService
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
    this.limpiarCampos();
  }

   //Resetea Formulario
  limpiarCampos(){
    this.loginForm.reset();
  }


  iniciarSesion(credenciales){
    // Enviamos un diccionario
    var usuario = {
      usuario: credenciales.username,
      contrasenia: credenciales.password,
    };

    this.apiService.iniciarSesionPOST(usuario).subscribe(
      (data) => {
        console.log(data);
        console.log(data.mensaje)
        // SI EXISTE EL USUARIO QUE INICIE SESIÓN 
        this.authService.login(credenciales.username, credenciales.password,data.tipoUsuario,data.rut,data.bienvenida);
      },
      (error) => {
        console.log(error);
        // Aquí podría poner una alerta de que las credenciales son incorrectas
      }
    );
  }


  recuperarCuenta(){
    //this.router.navigate(['/cambiar-contrasenia'])
    this.router.navigate(['/cursos-profesor']);
  }

  // Agrego métodos get para validar el Formulario
  get username(){ return this.loginForm.get('username'); }
  get password(){ return this.loginForm.get('password'); }

  /*
    //Lamda
  recuperarTodo() {
    this.apiService.getPosts().subscribe(
      (data) => {
        console.log(data);
      }, //Si recupera un dato 
      (error) => {
        console.log(error);
      } // si da un error
    );
  }

  recuperarID() {
    this.apiService.getPost(20).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  recuperarDolar() {
    this.apiService.getDolar().subscribe(
      (data) => {
        console.log(data.serie[0].valor); // Del array que nos devuelve tomamos el item i = 0 y sólo el valor
      }, //Si recupera un dato 
      (error) => {
        console.log(error);
      } // si da un error
    );
  }

  crearPost() {
    var post = {
      userId: 1,
      id: 101,
      title: 'hola mundo',
      body: 'hola lindo mundo'
    };
    this.apiService.crearPost(post).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updatePost() {
    var post = {
      userId: 1,
      id: 20,
      title: 'hola mundo',
      body: 'hola lindo mundo'
    };
    this.apiService.updatePost(20, post).subscribe(
      (success) => {
        console.log(success);
      },
      (e) => {
        console.log(e);
      }
    );
  }

  deletePost(){
    this.apiService.deletePost(20).subscribe(
      (success) => {
        console.log(success);
      },
      (e) => {
        console.log(e);
      }
    );
  }

  
  */

}
