import { Component, OnInit } from '@angular/core';
//
import { TtsService } from 'src/app/services/tts.service';

// importamos BarCodeScanner
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  codigoScaneado = null;

  constructor
  (
    private _tts:TtsService,
    private barcodeScanner: BarcodeScanner
  ) { }

  ngOnInit() {
    if(this.codigoScaneado!=null && this.codigoScaneado!=""){
      this._tts.asistenciaRegistrada();
    }
  }

  asistente(){
    this._tts.ayudaScanearQR();
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
