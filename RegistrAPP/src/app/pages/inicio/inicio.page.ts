import { Component, OnInit } from '@angular/core';
// Importamos activated route para recibir parametros
import { ActivatedRoute } from '@angular/router';
///
import { TtsService } from 'src/app/services/tts.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  //Variable username
  username: any;
  
  // Variable rut 
  rut: any;

  constructor
  (
    private _stts:TtsService,
    private activatedRoute: ActivatedRoute
  ) { }

  hablar(esp:string){
    this._stts.decir(esp);
  }

  ngOnInit() {
    this.username = this.activatedRoute.snapshot.paramMap.get("username");
    this.rut = this.activatedRoute.snapshot.paramMap.get("rut");
  }

}
