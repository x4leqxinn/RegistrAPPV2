import { Component, OnInit } from '@angular/core';

//Importamos para recibir parametros
import { ActivatedRoute, Router } from '@angular/router';
//
import { LoadingController } from '@ionic/angular';
//
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-asignaturas-profesor',
  templateUrl: './asignaturas-profesor.page.html',
  styleUrls: ['./asignaturas-profesor.page.scss'],
})
export class AsignaturasProfesorPage implements OnInit {

  //Recibimos el rut por URL
  rut : any;
  //Recibimos el id_curso por URL
  asignaturaID : any;

  constructor
  (
    private activatedRoute: ActivatedRoute, // Para recibir los parametros
    private apiService: ApiService,
    private loadingController: LoadingController,
    private router:Router
  )
   { }

  ngOnInit() {
    this.rut = this.activatedRoute.snapshot.paramMap.get("rut");
    this.asignaturaID = this.activatedRoute.snapshot.paramMap.get("asignaturaID");
    this.listarAsignatura();
  }



  async listarAsignatura(){
    const carga = await this.loadingController.create({
      message:"Cargando ..."
    });

    await carga.present();

      // 
      this.apiService.listarAsignaturaGET(this.rut,this.asignaturaID).subscribe(
        (data) => {
          console.log(data);
          /*
          for(var i = 0; i<data.cursos.length; i++){
            // Creo un objeto de tipo CURSO
            this.curso = {
              id:data.cursos[i][0],
              nombre:data.cursos[i][1]
            }
            // Lo agrego  a mi Array de CURSOS
            this.cursos.push(this.curso);
          }
          */
          carga.dismiss();
          //this.navController.navigateForward("/"); esto es para devolverse a la ventana anterior
        }, //Si recupera un dato 
        (error) => {
          console.log(error);
        } // si da un error
      );
  }

  listarClases(asignaturaID){
    this.router.navigate(['/clases-profesor/',this.rut,asignaturaID]);
  }
}
