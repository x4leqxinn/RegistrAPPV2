import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsignaturasProfesorPageRoutingModule } from './asignaturas-profesor-routing.module';

import { AsignaturasProfesorPage } from './asignaturas-profesor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsignaturasProfesorPageRoutingModule
  ],
  declarations: [AsignaturasProfesorPage]
})
export class AsignaturasProfesorPageModule {}
