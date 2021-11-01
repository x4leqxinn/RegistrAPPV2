import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstadoAsistenciaPageRoutingModule } from './estado-asistencia-routing.module';

import { EstadoAsistenciaPage } from './estado-asistencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstadoAsistenciaPageRoutingModule
  ],
  declarations: [EstadoAsistenciaPage]
})
export class EstadoAsistenciaPageModule {}
