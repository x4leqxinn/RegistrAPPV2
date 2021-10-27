import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsistenciasProfesorPageRoutingModule } from './asistencias-profesor-routing.module';

import { AsistenciasProfesorPage } from './asistencias-profesor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsistenciasProfesorPageRoutingModule
  ],
  declarations: [AsistenciasProfesorPage]
})
export class AsistenciasProfesorPageModule {}
