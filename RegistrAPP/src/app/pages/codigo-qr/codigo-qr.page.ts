import { Component, OnInit } from '@angular/core';
// importamos BarCodeScanner
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

// importamos el asistente de voz
import { TtsService } from 'src/app/services/tts.service';

//
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-codigo-qr',
  templateUrl: './codigo-qr.page.html',
  styleUrls: ['./codigo-qr.page.scss'],
})
export class CodigoQRPage implements OnInit {
  //
  qrData= null;
  codigoCreado = null;
  codigoScaneado = null;
  rut:any;
  claseID : any;
  cursoID:any;

  elementType: 'url' | 'img' | 'canvas' = 'canvas'

  constructor
  (
    private barcodeScanner: BarcodeScanner,
    private _stts: TtsService,
    private activatedRoute : ActivatedRoute
  ) {}

  ngOnInit() {
    this.rut = this.activatedRoute.snapshot.paramMap.get("rut");
    this.cursoID = this.activatedRoute.snapshot.paramMap.get("cursoID");
    this.claseID = this.activatedRoute.snapshot.paramMap.get("claseID");
  }
  
  //Asistente de voz
  asistente(){
    this._stts.ayudaGenerarQR();
  }

  crearCodigo(){
    this.codigoCreado = this.qrData;
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
