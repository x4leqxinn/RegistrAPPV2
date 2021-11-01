import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumenAsistenciasPageRoutingModule } from './resumen-asistencias-routing.module';

import { ResumenAsistenciasPage } from './resumen-asistencias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResumenAsistenciasPageRoutingModule
  ],
  declarations: [ResumenAsistenciasPage]
})
export class ResumenAsistenciasPageModule {}
