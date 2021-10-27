import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsignaturasAlumnoPage } from './asignaturas-alumno.page';

const routes: Routes = [
  {
    path: '',
    component: AsignaturasAlumnoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsignaturasAlumnoPageRoutingModule {}
