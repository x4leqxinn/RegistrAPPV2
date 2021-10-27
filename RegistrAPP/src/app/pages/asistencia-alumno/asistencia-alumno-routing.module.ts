import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsistenciaAlumnoPage } from './asistencia-alumno.page';

const routes: Routes = [
  {
    path: '',
    component: AsistenciaAlumnoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsistenciaAlumnoPageRoutingModule {}
