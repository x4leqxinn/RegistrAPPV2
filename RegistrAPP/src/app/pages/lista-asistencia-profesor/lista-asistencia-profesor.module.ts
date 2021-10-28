import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaAsistenciaProfesorPageRoutingModule } from './lista-asistencia-profesor-routing.module';

import { ListaAsistenciaProfesorPage } from './lista-asistencia-profesor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaAsistenciaProfesorPageRoutingModule
  ],
  declarations: [ListaAsistenciaProfesorPage]
})
export class ListaAsistenciaProfesorPageModule {}
