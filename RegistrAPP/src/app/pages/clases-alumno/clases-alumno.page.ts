import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ClaseAlumnoI } from 'src/app/components/model/clase-alumno.interface';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-clases-alumno',
  templateUrl: './clases-alumno.page.html',
  styleUrls: ['./clases-alumno.page.scss'],
})
export class ClasesAlumnoPage implements OnInit {

  // Variables
  rut: any;
  asignaturaID: any;

  // Modelo Clase
  clase: ClaseAlumnoI;

  // Lista de clases
  clases: ClaseAlumnoI[] = [];

  constructor
    (
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private loadingController: LoadingController,
      private apiService: ApiService,
      private authentication: AuthenticationService,
      private alertController : AlertController
    ) { }

  ngOnInit() {
    this.rut = this.activatedRoute.snapshot.paramMap.get("rut");
    this.asignaturaID = this.activatedRoute.snapshot.paramMap.get("asignaturaID");
    this.listarClases();
  }

  async listarClases() {
    const carga = await this.loadingController.create({
      message: "Cargando ..."
    });

    await carga.present();

    this.apiService.listarClaseAlumnoGET(this.rut, this.asignaturaID).subscribe(
      (data) => {
        console.log(data);
        if (data.mensaje == 'Encontrado') {
          for (var i = 0; i < data.clases.length; i++) {

            // Creo un objeto de tipo Clase
            this.clase = {
              id: data.clases[i][0],
              fecha: data.clases[i][1],
              horaInicio: data.clases[i][2],
              horaTermino: data.clases[i][3],
              curso: data.clases[i][4],
              profesor: data.clases[i][5],
              emailProfesor: data.clases[i][6],
            }

            // Lo agrego  a mi Array de CLASES
            this.clases.push(this.clase);
          }
          carga.dismiss();
        } else {
          // No encontró resultados Mensaje
          carga.dismiss();
        }
      },
      (error) => {
        console.log(error);
        carga.dismiss();
        // Mensaje de error se cayó el server
      }
    );
  }
  // Método que redireccionará al Docente al Inicio de la app y podrá gestionar las operaciones
  menu(id) {
    // Guardamos los parámetros en el local Storage
    this.guardarDatos(id);
    // Nos dirijimos al menú de Docentes
    this.router.navigate(['tabs-alumno/']);

  }

  guardarDatos(id) {
    // Capturamos la data
    let data = {
      rut: this.rut,
      claseID: id
    };
    // Guardamos la data en LOCAL STORAGE Serializamos
    localStorage.setItem('dataAlumno', JSON.stringify(data));
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
