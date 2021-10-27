import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsignaturasAlumnoPageRoutingModule } from './asignaturas-alumno-routing.module';

import { AsignaturasAlumnoPage } from './asignaturas-alumno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsignaturasAlumnoPageRoutingModule
  ],
  declarations: [AsignaturasAlumnoPage]
})
export class AsignaturasAlumnoPageModule {}
