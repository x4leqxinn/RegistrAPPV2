import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { RecuperarCuentaPageRoutingModule } from './recuperar-cuenta-routing.module';

import { RecuperarCuentaPage } from './recuperar-cuenta.page';

//
import { AppFormulariosModule } from 'src/app/app-formularios.module'; 

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RecuperarCuentaPageRoutingModule,
    AppFormulariosModule,
  ],
  declarations: [RecuperarCuentaPage]
})
export class RecuperarCuentaPageModule {}
