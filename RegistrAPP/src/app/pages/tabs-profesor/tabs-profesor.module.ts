import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsProfesorPageRoutingModule } from './tabs-profesor-routing.module';

import { TabsProfesorPage } from './tabs-profesor.page';

// Importamos Routes y RouterModule
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: TabsProfesorPage,
  children: [
    //Indico las rutas que quiero que se precargen
    {
      path: 'asistencia',
      loadChildren: () => import('../asistencia/asistencia.module').then( m => m.AsistenciaPageModule)
    },
    {
      path: 'inicio/:username/:rut',
      loadChildren: () => import('../inicio/inicio.module').then( m => m.InicioPageModule)
    },
    {
      path: 'codigo-qr',
      loadChildren: () => import('../codigo-qr/codigo-qr.module').then( m => m.CodigoQRPageModule)
    }
  ]
}];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsProfesorPageRoutingModule,
    RouterModule.forChild(routes) // Cargo todas la rutas (paths)
  ],
  declarations: [TabsProfesorPage]
})
export class TabsProfesorPageModule {}
