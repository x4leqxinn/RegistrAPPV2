import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleRegistroPageRoutingModule } from './detalle-registro-routing.module';

import { DetalleRegistroPage } from './detalle-registro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleRegistroPageRoutingModule
  ],
  declarations: [DetalleRegistroPage]
})
export class DetalleRegistroPageModule {}
