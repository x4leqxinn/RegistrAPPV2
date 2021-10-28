import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClasesAlumnoPageRoutingModule } from './clases-alumno-routing.module';

import { ClasesAlumnoPage } from './clases-alumno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClasesAlumnoPageRoutingModule
  ],
  declarations: [ClasesAlumnoPage]
})
export class ClasesAlumnoPageModule {}
