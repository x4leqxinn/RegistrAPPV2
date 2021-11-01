import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenerarQrPageRoutingModule } from './generar-qr-routing.module';

import { GenerarQrPage } from './generar-qr.page';

// Importamos el generador de códigos QR
import { NgxQRCodeModule } from 'ngx-qrcode2'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenerarQrPageRoutingModule,
    NgxQRCodeModule // Importamos generador de QR
  ],
  declarations: [GenerarQrPage]
})
export class GenerarQrPageModule {}
