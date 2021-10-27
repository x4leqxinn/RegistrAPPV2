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
      },
      (error) => {
        console.log(error);
      }
    );
  }


  recuperarCuenta(){
    this.router.navigate(['/recuperar-cuenta'])
    //this.router.navigate(['/codigo-qr'])
  }

  // Agrego métodos get para validar el Formulario
  get username(){ return this.loginForm.get('username'); }
  get password(){ return this.loginForm.get('password'); }

}
