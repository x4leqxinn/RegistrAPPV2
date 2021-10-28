import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaAsistenciaProfesorPage } from './lista-asistencia-profesor.page';

const routes: Routes = [
  {
    path: '',
    component: ListaAsistenciaProfesorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaAsistenciaProfesorPageRoutingModule {}
