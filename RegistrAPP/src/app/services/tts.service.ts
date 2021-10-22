import { Injectable } from '@angular/core';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';

// Generamos una carpeta para usar el servicio

@Injectable({
  providedIn: 'root'
})
export class TtsService {

  constructor(private _tts: TextToSpeech) { }

  decir(texto:string){
    this._tts.speak({
      text:texto,
      locale:'es-CL', //Idioma
      rate:1
      // Función de flecha que nos indica si funciona o no el método
    }).then(()=>console.log('Funciona'))
    .catch((resp:any)=>console.error(resp) 
    );
  }

  ayudaGenerarQR(){
    this._tts.speak({
      text:'Hola bienvenido, yo soy tu asistente virtual, a continuación ingrese alguna dirección, luego presione en el botón generar y nosotros nos encargaremos de crear un código QR por ti.',
      locale:'es-CL', //Idioma
      rate:1
      // Función de flecha que nos indica si funciona o no el método
    }).then(()=>console.log('Funciona'))
    .catch((resp:any)=>console.error(resp) 
    );
  }

  ayudaScanearQR(){
    this._tts.speak({
      text:'Hola bienvenido, yo soy tu asistente virtual, a continuación presione, el botón Escanear QR, se abrirá la cámara de tu dispositivo móvil y registrará tu asistencia al cuadrar el código entregado por tu profesor.',
      locale:'es-CL', //Idioma
      rate:1
      // Función de flecha que nos indica si funciona o no el método
    }).then(()=>console.log('Funciona'))
    .catch((resp:any)=>console.error(resp) 
    );
  }

  asistenciaRegistrada(){
    this._tts.speak({
      text:'Tu asistencia ha sido registrada.',
      locale:'es-CL', //Idioma
      rate:1
      // Función de flecha que nos indica si funciona o no el método
    }).then(()=>console.log('Funciona'))
    .catch((resp:any)=>console.error(resp) 
    );
  }


}
