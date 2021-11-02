import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsAlumnoPageRoutingModule } from './tabs-alumno-routing.module';

import { TabsAlumnoPage } from './tabs-alumno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsAlumnoPageRoutingModule
  ],
  declarations: [TabsAlumnoPage]
})
export class TabsAlumnoPageModule {}
