import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstadoAsistenciaPage } from './estado-asistencia.page';

const routes: Routes = [
  {
    path: '',
    component: EstadoAsistenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstadoAsistenciaPageRoutingModule {}
