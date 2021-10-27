import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CursosProfesorPageRoutingModule } from './cursos-profesor-routing.module';

import { CursosProfesorPage } from './cursos-profesor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CursosProfesorPageRoutingModule
  ],
  declarations: [CursosProfesorPage]
})
export class CursosProfesorPageModule {}
