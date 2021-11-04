import { Component, OnInit } from '@angular/core';

// importamos BarCodeScanner
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx'
import { AlertController } from '@ionic/angular';
//
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

// importamos el asistente de voz
import { TtsService } from 'src/app/services/tts.service';

@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.page.html',
  styleUrls: ['./generar-qr.page.scss'],
})
export class GenerarQrPage implements OnInit {
  //
  qrData = null;
  codigoCreado = null;
  codigoScaneado = null;
  rut: any;
  claseID: any;
  cursoID: any;

  elementType: 'url' | 'img' | 'canvas' = 'canvas'

  constructor
    (
      private barcodeScanner: BarcodeScanner,
      private _stts: TtsService,
      private apiService: ApiService,
      private alertController: AlertController,
      private authentication : AuthenticationService
    ) { }

  ngOnInit() {

  }

  //Asistente de voz
  asistente() {
    if(localStorage.getItem('bienvenida')){
      this._stts.ayudaGenerarQR(localStorage.getItem('bienvenida'));
    }else{
      console.log('No hay data');
    }
  }

  crearCodigo() {
    // Guardamos la dirección del Código QR
    this.codigoCreado = this.qrData;
    // Guardamos el código de la clase en la BDD
    this.generarCodigoClase(this.codigoCreado);

  }

  scannearCodigo() {
    this.barcodeScanner.scan().then
      (barcodeData => {
        this.codigoScaneado = barcodeData.text;
      }
      )
  }

  async messageAlert(titulo, mensaje) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ["OK"],
    })
    await alert.present();
    //Que se cierre cuando aprete el botón
    await alert.onDidDismiss();
  }


  generarCodigoClase(direccionQR) {
    if (localStorage.getItem('dataDocente')) {
      var local = JSON.parse(localStorage.getItem("dataDocente"));

      let datos = {
        claseID: local.claseID,
        direccionQR: direccionQR
      }

      this.apiService.generarCodigoQRPUT(datos).subscribe(
        (data) => {
          console.log(data);
          this.messageAlert("¡Éxito!", "¡Código QR de la clase generado con éxito!");
        },
        (error) => {
          console.log(error);
          this.messageAlert("¡ERROR!", "El servicio no se encuentra disponible, intente más tarde.");
        }
      );
    } else {
      // No hay datos en el LOCAL
      this.messageAlert("¡ERROR!", "Error al generar el código QR.");
    }

  }

  async cerrarSesion() {
    const alert = await this.alertController.create({
      header: "Cerrar sesión",
      message: "¿Estás seguro?",
      buttons: [
        {
          text: 'Sí',
          handler: () => {
            console.log("Sesión finalizada");
            this.authentication.logout();
          }
        },
        {
          text: 'No',
          handler: () => {
            console.log("Cancelar");
          }
        }
      ]
    });
    await alert.present();
    //Que se cierre cuando aprete el botón
    await alert.onDidDismiss();
  }
  
}
