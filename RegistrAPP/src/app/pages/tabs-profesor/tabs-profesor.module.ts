import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsProfesorPageRoutingModule } from './tabs-profesor-routing.module';

import { TabsProfesorPage } from './tabs-profesor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsProfesorPageRoutingModule,
  ],
  declarations: [TabsProfesorPage]
})
export class TabsProfesorPageModule {}
