import { Component, OnInit } from '@angular/core';
// Importamos el modelo CURSO
import { CursoI } from 'src/app/components/model/curso.interface';
// Importamos el servicio de la API
import { ApiService } from 'src/app/services/api.service';
// Importamos NAV CONTROLLER y LoadingController
import { NavController, LoadingController, AlertController } from '@ionic/angular';
//
import { Router } from '@angular/router';
//
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-cursos-profesor',
  templateUrl: './cursos-profesor.page.html',
  styleUrls: ['./cursos-profesor.page.scss'],
})
export class CursosProfesorPage implements OnInit {
  //Recibimos el rut por parametro
  rut: any;

  // Curso
  curso: CursoI;

  //Arreglo de cursos
  cursos: CursoI[] = [];

  // Debemos Recibir el RUT DEL PROFESOR QUE INGRESE

  constructor
    (
      private apiService: ApiService,
      private loadingController: LoadingController,
      private navController: NavController,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private authentication: AuthenticationService,
      private alertController: AlertController
    ) { }

  ngOnInit() {
    this.rut = this.activatedRoute.snapshot.paramMap.get("rut");
    this.listarCurso();
  }


  async listarCurso() {
    const carga = await this.loadingController.create({
      message: "Cargando ..."
    });

    await carga.present();

    // CAMBIAR POR EL RUT DEL PROFESOR INGRESADO EN EL LOGIN
    this.apiService.listarCursoGET('17268410').subscribe(
      (data) => {
        console.log(data);
        for (var i = 0; i < data.cursos.length; i++) {
          // Creo un objeto de tipo CURSO
          this.curso = {
            id: data.cursos[i][0],
            nombre: data.cursos[i][1]
          }
          // Lo agrego  a mi Array de CURSOS
          this.cursos.push(this.curso);
        }

        carga.dismiss();
        //this.navController.navigateForward("/"); esto es para devolverse a la ventana anterior
      }, //Si recupera un dato 
      (error) => {
        console.log(error);
      } // si da un error
    );
  }

  listarAsignaturas(id) {
    this.router.navigate(['/asignaturas-profesor/', this.rut, id]);
  }
  async cerrarSesion() {
    const alert = await this.alertController.create({
      header: "Cerrar sesión",
      message: "¿Estás seguro?",
      buttons: [
        {
          text: 'Sí',
          handler: () => {
            console.log("Sesión finalizada");
            this.authentication.logout();
          }
        },
        {
          text: 'No',
          handler: () => {
            console.log("Cancelar");
          }
        }
      ]
    });
    await alert.present();
    //Que se cierre cuando aprete el botón
    await alert.onDidDismiss();
  }
}
