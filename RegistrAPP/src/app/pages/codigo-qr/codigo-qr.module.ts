import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CodigoQRPageRoutingModule } from './codigo-qr-routing.module';

import { CodigoQRPage } from './codigo-qr.page';

// Importamos el generador de códigos QR
import { NgxQRCodeModule } from 'ngx-qrcode2'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CodigoQRPageRoutingModule,
    NgxQRCodeModule // Importamos generador de QR
  ],
  declarations: [CodigoQRPage]
})
export class CodigoQRPageModule {}
