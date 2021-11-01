import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  rut : any;
  constructor() { }

  ngOnInit() {
    this.recuperarRut()
  }

  recuperarRut() {
    //Obtener data del Local Storage
    if (localStorage.getItem('dataDocente')) {
      // Si existe haga esto
      let datos = localStorage.getItem('dataDocente');
      let data = JSON.parse(datos); // Lo convertimos a un objeto
      this.rut = data.rut;


    } else {
      // No hay datos en el Local Storage
      console.log('Error no hay datos en el Local Storage');
    }
  }
}
