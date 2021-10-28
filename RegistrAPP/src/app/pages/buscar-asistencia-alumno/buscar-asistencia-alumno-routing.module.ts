import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuscarAsistenciaAlumnoPage } from './buscar-asistencia-alumno.page';

const routes: Routes = [
  {
    path: '',
    component: BuscarAsistenciaAlumnoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuscarAsistenciaAlumnoPageRoutingModule {}
