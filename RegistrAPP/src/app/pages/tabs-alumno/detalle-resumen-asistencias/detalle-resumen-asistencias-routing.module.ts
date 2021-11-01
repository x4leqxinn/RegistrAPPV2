import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleResumenAsistenciasPage } from './detalle-resumen-asistencias.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleResumenAsistenciasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleResumenAsistenciasPageRoutingModule {}
