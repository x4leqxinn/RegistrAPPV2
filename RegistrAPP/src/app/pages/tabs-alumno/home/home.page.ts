import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  inicio : any;
  constructor() { }

  ngOnInit() {
    this.bienvenida();
  }

  bienvenida() {
    //Obtener data del Local Storage
    if (localStorage.getItem('bienvenida')) {
      // Si existe haga esto
      this.inicio = localStorage.getItem('bienvenida');
    } else {
      // No hay datos en el Local Storage
      console.log('Error no hay datos en el Local Storage');
    }
  }
}


