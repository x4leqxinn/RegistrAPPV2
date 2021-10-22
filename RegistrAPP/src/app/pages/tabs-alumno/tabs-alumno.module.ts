import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsAlumnoPageRoutingModule } from './tabs-alumno-routing.module';

import { TabsAlumnoPage } from './tabs-alumno.page';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: TabsAlumnoPage,
  children: [
    //Indico las rutas que quiero que se precargen
    {
      path: 'asistencia',
      loadChildren: () => import('../asistencia/asistencia.module').then( m => m.AsistenciaPageModule)
    },
    {
      path: 'inicio/:username',
      loadChildren: () => import('../inicio/inicio.module').then( m => m.InicioPageModule)
    }
  ]
}];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsAlumnoPageRoutingModule,
    RouterModule.forChild(routes) // Cargo todas la rutas (paths)
  ],
  declarations: [TabsAlumnoPage]
})
export class TabsAlumnoPageModule {}
