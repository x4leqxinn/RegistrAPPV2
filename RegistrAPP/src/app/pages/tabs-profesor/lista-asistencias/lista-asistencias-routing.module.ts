import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaAsistenciasPage } from './lista-asistencias.page';

const routes: Routes = [
  {
    path: '',
    component: ListaAsistenciasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaAsistenciasPageRoutingModule {}
