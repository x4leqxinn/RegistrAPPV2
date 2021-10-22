import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { IniciarSesionPageRoutingModule } from './iniciar-sesion-routing.module';
import { IniciarSesionPage } from './iniciar-sesion.page';

// Importamos FormsModule y ReactiveFormsModule
import { AppFormulariosModule } from 'src/app/app-formularios.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    IniciarSesionPageRoutingModule,
    //Importamos ReactiveForms y FormsModule
    AppFormulariosModule,
  ],
  declarations: [IniciarSesionPage]
})
export class IniciarSesionPageModule {}
