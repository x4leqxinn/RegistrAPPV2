import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaAsistenciasPageRoutingModule } from './lista-asistencias-routing.module';

import { ListaAsistenciasPage } from './lista-asistencias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaAsistenciasPageRoutingModule
  ],
  declarations: [ListaAsistenciasPage]
})
export class ListaAsistenciasPageModule {}
