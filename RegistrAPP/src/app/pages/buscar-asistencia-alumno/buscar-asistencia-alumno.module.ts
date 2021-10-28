import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuscarAsistenciaAlumnoPageRoutingModule } from './buscar-asistencia-alumno-routing.module';

import { BuscarAsistenciaAlumnoPage } from './buscar-asistencia-alumno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuscarAsistenciaAlumnoPageRoutingModule
  ],
  declarations: [BuscarAsistenciaAlumnoPage]
})
export class BuscarAsistenciaAlumnoPageModule {}
