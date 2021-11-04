import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsProfesorPage } from './tabs-profesor.page';

// Asigno las rutas para los TABS
const routes: Routes = [
  {
    path: '',
    component: TabsProfesorPage, //Una opción es quitar las rutas como Childrens
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'registrar-asistencia',
        loadChildren: () => import('./registrar-asistencia/registrar-asistencia.module').then( m => m.RegistrarAsistenciaPageModule)
      },
      {
        path: 'generar-qr',
        loadChildren: () => import('./generar-qr/generar-qr.module').then( m => m.GenerarQrPageModule)
      },
      {
        path: 'lista-asistencias',
        loadChildren: () => import('./lista-asistencias/lista-asistencias.module').then( m => m.ListaAsistenciasPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs-profesor/home', 
        pathMatch: 'full'
      }  //Si entra a TABS-PROFESOR SERÁ REDIRIGIDO A PERFIL
    ]
  },
  {
    path: 'detalle-registro/:id',
    loadChildren: () => import('./detalle-registro/detalle-registro.module').then( m => m.DetalleRegistroPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Importamos las rutas
  exports: [RouterModule],
})
export class TabsProfesorPageRoutingModule {}
