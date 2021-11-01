import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleResumenPage } from './detalle-resumen.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleResumenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleResumenPageRoutingModule {}
