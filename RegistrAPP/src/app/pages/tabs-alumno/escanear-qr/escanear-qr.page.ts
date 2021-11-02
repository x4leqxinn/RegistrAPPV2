import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { TtsService } from 'src/app/services/tts.service';

@Component({
  selector: 'app-escanear-qr',
  templateUrl: './escanear-qr.page.html',
  styleUrls: ['./escanear-qr.page.scss'],
})
export class EscanearQrPage implements OnInit {
  codigoScaneado = null;

  constructor
  (
    private _tts:TtsService,
    private barcodeScanner: BarcodeScanner
  ) { }

  ngOnInit() {
    /*
    if(this.codigoScaneado != null && this.codigoScaneado != ""){
      this._tts.asistenciaRegistrada();
    }
    */
  }

  asistente(){
    if(localStorage.getItem('bienvenida')){
      this._tts.ayudaScanearQR(localStorage.getItem('bienvenida'));
    }else{
      console.log('No hay data');
    }
  }

  scannearCodigo(){
    this.barcodeScanner.scan().then
    (barcodeData => 
      {
      this.codigoScaneado = barcodeData.text;
      }
    )
  }

}