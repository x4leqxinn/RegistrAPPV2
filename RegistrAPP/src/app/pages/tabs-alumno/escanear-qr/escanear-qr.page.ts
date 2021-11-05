import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';
import { AsistenciaI } from 'src/app/components/model/asistencia.interface';
import { EscanearI } from 'src/app/components/model/escanear.interface';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TtsService } from 'src/app/services/tts.service';

@Component({
  selector: 'app-escanear-qr',
  templateUrl: './escanear-qr.page.html',
  styleUrls: ['./escanear-qr.page.scss'],
})
export class EscanearQrPage implements OnInit {
  codigoScaneado = null;
  validarScan: EscanearI;
  asistencia: AsistenciaI;

  constructor
    (
      private _tts: TtsService,
      private authentication: AuthenticationService,
      private alertController: AlertController,
      private barcodeScanner: BarcodeScanner,
      private apiService : ApiService
    ) { }

  ngOnInit() {
    /*
    if(this.codigoScaneado != null && this.codigoScaneado != ""){
      this._tts.asistenciaRegistrada();
    }
    */
    
  }

  test(){
    // Funciona!
    console.log(this.validarCodigo(this.obtenerClaseID(),'www.youtube.com'));
  }
  asistente() {
    if (localStorage.getItem('bienvenida')) {
      this._tts.ayudaScanearQR(localStorage.getItem('bienvenida'));
    } else {
      console.log('No hay data');
    }
  }

  escanearCodigo() {
    this.barcodeScanner.scan().then
      (barcodeData => {
        this.codigoScaneado = barcodeData.text;
      }
      )
    this.escanearCodigo //////////////////////
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

  validarCodigo(claseID, direccionQR){
    this.validarScan = {
      claseID: claseID,
      direccionQR: direccionQR
    }

    this.apiService.escanearCodigoQRPOST(this.validarScan).subscribe(
      (data) => {
        console.log(data);
        if(data.mensaje == 'Success'){
          console.log('Escaneo exitoso, registrar asistencia');
          // Si el código QR coincide con el código ingresado por el Profesor que lo registre
          this.registrarAsistencia(claseID,this.obtenerRutAlumno());
        }else{
          console.log('Escanea el código de la clase!');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  obtenerClaseID():number{
    var valida = 0;
    if(localStorage.getItem('dataAlumno')){
      var data = JSON.parse(localStorage.getItem('dataAlumno'));
      valida = data.claseID;
    }else{
      console.log('No hay data en el localstorage');
    }
    return valida;
  }

  registrarAsistencia(claseID, rutAlumno){
    this.asistencia = {
      id: 0,
      claseID: claseID,
      estadoID: 1,
      rutAlumno: rutAlumno
    }

    this.apiService.agregarAsistenciaPOST(this.asistencia).subscribe(
      (data) => {
        console.log(data);
        if(data.mensaje == 'Success'){
          console.log('Asistencia registrada con éxito');
        }else{
          console.log('¡Su asistencia, ya ha sido registrada!');
        }
      },
      (error) => {
        console.log(error);
      }
    );

  }

  obtenerRutAlumno(){
    var valida = 0;
    if(localStorage.getItem('dataAlumno')){
      var data = JSON.parse(localStorage.getItem('dataAlumno'));
      valida = data.rut;
    }else{
      console.log('No hay data en el localstorage');
    }
    return valida;
  }

}