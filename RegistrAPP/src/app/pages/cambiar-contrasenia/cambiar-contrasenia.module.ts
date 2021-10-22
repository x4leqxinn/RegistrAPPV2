import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambiarContraseniaPageRoutingModule } from './cambiar-contrasenia-routing.module';

import { CambiarContraseniaPage } from './cambiar-contrasenia.page';

//
import { AppFormulariosModule } from 'src/app/app-formularios.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambiarContraseniaPageRoutingModule,
    AppFormulariosModule
  ],
  declarations: [CambiarContraseniaPage]
})
export class CambiarContraseniaPageModule {}
