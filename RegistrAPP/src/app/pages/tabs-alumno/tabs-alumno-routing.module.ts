import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsAlumnoPage } from './tabs-alumno.page';

const routes: Routes = [
  {
    path: '',
    component: TabsAlumnoPage
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'escanear-qr',
    loadChildren: () => import('./escanear-qr/escanear-qr.module').then( m => m.EscanearQrPageModule)
  },
  {
    path: 'estado-asistencia',
    loadChildren: () => import('./estado-asistencia/estado-asistencia.module').then( m => m.EstadoAsistenciaPageModule)
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
    path: 'detalle-resumen-asistencias',
    loadChildren: () => import('./detalle-resumen-asistencias/detalle-resumen-asistencias.module').then( m => m.DetalleResumenAsistenciasPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsAlumnoPageRoutingModule {}
