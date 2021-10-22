import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CambiarContraseniaPage } from './cambiar-contrasenia.page';

const routes: Routes = [
  {
    path: '',
    component: CambiarContraseniaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambiarContraseniaPageRoutingModule {}
