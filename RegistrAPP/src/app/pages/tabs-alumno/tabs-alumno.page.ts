import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AlertController, IonTabs } from '@ionic/angular';
import { AsistenciaI } from 'src/app/components/model/asistencia.interface';
import { EscanearI } from 'src/app/components/model/escanear.interface';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TtsService } from 'src/app/services/tts.service';

@Component({
  selector: 'app-tabs-alumno',
  templateUrl: './tabs-alumno.page.html',
  styleUrls: ['./tabs-alumno.page.scss'],
})
export class TabsAlumnoPage implements OnInit {
  // Variable de tab seleccionada
  selectTab: any;
  @ViewChild('tabs') tabs: IonTabs;

  constructor
  (
    private _tts: TtsService,
    private authentication: AuthenticationService,
    private alertController: AlertController,
    private barcodeScanner: BarcodeScanner,
    private apiService: ApiService,
    private router: Router
  ) { }


  ngOnInit() {
  }

  setCurrentTab(event) {
    console.log(event);   
    this.selectTab = this.tabs.getSelected();
  }

  codigoScaneado = null;
  validarScan: EscanearI;
  asistencia: AsistenciaI;


  test() {
    // Funciona!
    console.log(this.validarCodigo(this.obtenerClaseID(), 'www.youtube.co'));
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
        // Si al escanear el código de la clase este coincide con el generado
        // Registrará automáticamente la asistencia de el alumno
        this.validarCodigo(this.obtenerClaseID(), this.codigoScaneado);
      }
      )
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

  validarCodigo(claseID, direccionQR) {
    this.validarScan = {
      claseID: claseID,
      direccionQR: direccionQR
    }

    this.apiService.escanearCodigoQRPOST(this.validarScan).subscribe(
      (data) => {
        console.log(data);
        if (data.mensaje == 'Success') {
          console.log('Escaneo exitoso, registrar asistencia');
          // Si el código QR coincide con el código ingresado por el Profesor que lo registre
          this.registrarAsistencia(claseID, this.obtenerRutAlumno());
        } else {
          this.mensajeOk('¡Error!', '¡Asegúrate de escanear el código QR de la clase!');
        }
      },
      (error) => {
        console.log(error);
        this.mensajeOk('¡Lo sentimos!', 'EL servicio no se encuentra disponible en este momento, vuelva más tarde.');
      }
    );
  }

  obtenerClaseID(): number {
    var valida = 0;
    if (localStorage.getItem('dataAlumno')) {
      var data = JSON.parse(localStorage.getItem('dataAlumno'));
      valida = data.claseID;
    } else {
      console.log('No hay data en el localstorage');
    }
    return valida;
  }

  registrarAsistencia(claseID, rutAlumno) {
    this.asistencia = {
      id: 0,
      claseID: claseID,
      estadoID: 1,
      rutAlumno: rutAlumno
    }

    this.apiService.agregarAsistenciaPOST(this.asistencia).subscribe(
      (data) => {
        console.log(data);
        if (data.mensaje == 'Success') {
          console.log('Asistencia registrada con éxito');
          this.mensajeOk('¡Éxito!', '¡Asistencia de la clase registrada!');
          // El tts avisa el registro de la asistencia
          this._tts.asistenciaRegistrada();
        } else {
          console.log('¡Su asistencia, ya ha sido registrada!');
          this.mensajeOk('¡Error!', '¡Su asistencia ya ha sido registrada!');
        }
      },
      (error) => {
        console.log(error);
        this.mensajeOk('¡Lo sentimos!', 'EL servicio no se encuentra disponible en este momento, vuelva más tarde.');
      }
    );

  }

  obtenerRutAlumno() {
    var valida = 0;
    if (localStorage.getItem('dataAlumno')) {
      var data = JSON.parse(localStorage.getItem('dataAlumno'));
      valida = data.rut;
    } else {
      console.log('No hay data en el localstorage');
    }
    return valida;
  }

  // Alerta de confirmación
  async mensajeOk(titulo, mensaje) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ["OK"],
    })
    await alert.present();
    //Que se cierre cuando aprete el botón
    await alert.onDidDismiss();
  }


}
