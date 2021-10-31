import { Component, OnInit } from '@angular/core';
//
import { ActivatedRoute, Router } from '@angular/router';
//
import { LoadingController } from '@ionic/angular';
//
import { ClaseI } from 'src/app/components/model/clase.interface';
//
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-clases-profesor',
  templateUrl: './clases-profesor.page.html',
  styleUrls: ['./clases-profesor.page.scss'],
})
export class ClasesProfesorPage implements OnInit {

  // Variables
  rut : any;
  cursoID : any;
  asignaturaID : any;

  // Modelo Clase
  clase : ClaseI;

  // Lista de clases
  clases : ClaseI[] = [];

  constructor
  (
    private activatedRoute : ActivatedRoute,
    private router : Router,
    private loadingController : LoadingController,
    private apiService : ApiService
  ) { }

  ngOnInit() {
    this.rut = this.activatedRoute.snapshot.paramMap.get("rut");
    this.cursoID = this.activatedRoute.snapshot.paramMap.get("cursoID");
    this.asignaturaID = this.activatedRoute.snapshot.paramMap.get("asignaturaID");
    this.listarClases();
  }

  async listarClases(){
    const carga = await this.loadingController.create({
      message:"Cargando ..."
    });

    await carga.present();

      this.apiService.listarClaseDocenteGET(this.rut,this.cursoID,this.asignaturaID).subscribe(
        (data) => {
          console.log(data);
          if(data.mensaje == 'Encontrado'){
            for(var i = 0; i<data.clases.length; i++){

              // Creo un objeto de tipo Clase
              this.clase = {
                id:data.clases[i][0],
                asignatura:data.clases[i][1],
                fecha:data.clases[i][2],
                horaInicio:data.clases[i][3],
                horaTermino:data.clases[i][4],
              }
              
              // Lo agrego  a mi Array de CLASES
              this.clases.push(this.clase);
            }
            carga.dismiss();
          }else{
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
  menu(id){
    this.router.navigate(['tabs-profesor/inicio/',this.rut,this.cursoID,id]);
    //inicio/:rut/:cursoID/:claseID
  }


}
