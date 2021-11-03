import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-estado-asistencia',
  templateUrl: './estado-asistencia.page.html',
  styleUrls: ['./estado-asistencia.page.scss'],
})
export class EstadoAsistenciaPage implements OnInit {
  rut:any;
  claseID:any;
  estado : any;
  constructor
  (
    private apiService : ApiService
  )
  { }

  ngOnInit() {
    this.buscarEstadoAsistencia();
  }

  obtenerData(){
    if(localStorage.getItem('dataAlumno')){
      var data = JSON.parse(localStorage.getItem('dataAlumno'))
      this.rut = data.rut;
      this.claseID = data.claseID;
    }else{
      console.log('No hay datos en el local storage');
    }
  }

  buscarEstadoAsistencia(){
    this.obtenerData();
      this.apiService.buscarEstadoAsistenciaGET(this.rut,this.claseID).subscribe(
        (data) => {
          console.log(data);
          this.estado = data.estado; 
        },
        (error) => {
          console.log(error);
        }
      );
  }
  
}
