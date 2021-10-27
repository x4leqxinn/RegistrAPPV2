import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsistenciaAlumnoPageRoutingModule } from './asistencia-alumno-routing.module';

import { AsistenciaAlumnoPage } from './asistencia-alumno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsistenciaAlumnoPageRoutingModule
  ],
  declarations: [AsistenciaAlumnoPage]
})
export class AsistenciaAlumnoPageModule {}
