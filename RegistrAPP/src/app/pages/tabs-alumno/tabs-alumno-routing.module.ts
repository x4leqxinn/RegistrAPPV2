import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsAlumnoPage } from './tabs-alumno.page';


// Asigno las rutas para los TABS
const routes: Routes = [
  {
    path: '',
    component: TabsAlumnoPage, //Una opción es quitar las rutas como Childrens
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'estado-asistencia',
        loadChildren: () => import('./estado-asistencia/estado-asistencia.module').then( m => m.EstadoAsistenciaPageModule)
      },
      {
        path: 'escanear-qr',
        loadChildren: () => import('./escanear-qr/escanear-qr.module').then( m => m.EscanearQrPageModule)
      },
      {
        path: 'resumen-asistencias',
        loadChildren: () => import('./resumen-asistencias/resumen-asistencias.module').then( m => m.ResumenAsistenciasPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs-alumno/home', 
        pathMatch: 'full'
      }  
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsAlumnoPageRoutingModule {}
