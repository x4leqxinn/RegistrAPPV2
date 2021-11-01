import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleResumenAsistenciasPageRoutingModule } from './detalle-resumen-asistencias-routing.module';

import { DetalleResumenAsistenciasPage } from './detalle-resumen-asistencias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleResumenAsistenciasPageRoutingModule
  ],
  declarations: [DetalleResumenAsistenciasPage]
})
export class DetalleResumenAsistenciasPageModule {}
