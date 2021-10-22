import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  title: String = "Duoc UC"
  lat: number = -33.598283;
  lng: number = -70.578328;
  constructor() { }

  ngOnInit() {
  }

}
