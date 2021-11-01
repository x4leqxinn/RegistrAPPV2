import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleRegistroPage } from './detalle-registro.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleRegistroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleRegistroPageRoutingModule {}
