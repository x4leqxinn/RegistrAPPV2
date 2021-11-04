import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Importamos para Scanear y grabar en la galeria
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';

//Importar TTS
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx'

// Importar AuthenGuard , Authentication y Storage
import { AuthenticationService } from './services/authentication.service';
import { AuthenGuardService } from './services/authen-guard.service';
import { Storage } from '@ionic/storage';

// Importo mis componentes 
import { AlertasToast } from './components/ts/alertas/toast';
import { Mensaje } from './components/ts/alertas/mensaje-alerta';

// Importamos el HTTP CLIENT
import { HttpClientModule } from '@angular/common/http';

//
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    BrowserAnimationsModule,
    HttpClientModule, // HTTP Client para el consumo de APIS
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
   ,BarcodeScanner, Base64ToGallery, // Importamos las librerias de Code QR
   TextToSpeech, // Importamos TTS
   AuthenGuardService, // AuthenGuard
   AuthenticationService, // Authentication
   Storage, // Storage
   AlertasToast, // Importo de forma global la clase de Alertas Toast
   Mensaje, // Importo de forma global la clase de Mensajes de alerta
   StatusBar,
   SplashScreen,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
