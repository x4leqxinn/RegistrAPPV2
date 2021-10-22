import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecuperarCuentaPage } from './recuperar-cuenta.page';

const routes: Routes = [
  {
    path: '',
    component: RecuperarCuentaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecuperarCuentaPageRoutingModule {}
