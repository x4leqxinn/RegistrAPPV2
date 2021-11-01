import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleResumenPageRoutingModule } from './detalle-resumen-routing.module';

import { DetalleResumenPage } from './detalle-resumen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleResumenPageRoutingModule
  ],
  declarations: [DetalleResumenPage]
})
export class DetalleResumenPageModule {}
