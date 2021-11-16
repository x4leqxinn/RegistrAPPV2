import { Injectable } from '@angular/core';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';

// Generamos una carpeta para usar el servicio

@Injectable({
  providedIn: 'root'
})
export class TtsService {

  constructor(private _tts: TextToSpeech) { }

  voz(texto:string){
    this._tts.speak({
      text:texto,
      locale:'es-CL', //Idioma
      rate:1
      // Función de flecha que nos indica si funciona o no el método
    }).then(()=>console.log('Funciona'))
    .catch((resp:any)=>console.error(resp) 
    );
  }

  ayudaGenerarQR(bienvenida){
    this.voz(bienvenida + ', ingrese una dirección para generar un código qr válido para la clase de hoy y a continuación presione el botón.');
  }

  ayudaScanearQR(bienvenida){
    this.voz(bienvenida + ', consulte a su docente por el código qr de la clase y abra la cámara de su dispositivo para registrar su asistencia con el botón presentado en pantalla.');
  }

  asistenciaRegistrada(){
    this.voz('Tu asistencia ha sido registrada con éxito.');
  }

  aviso(){
    this.voz('Lamentablemente no es posible conectarse a la API desde un teléfono celular en este momento, carita triste');
  }


}
