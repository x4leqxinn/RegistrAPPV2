import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClasesAlumnoPage } from './clases-alumno.page';

const routes: Routes = [
  {
    path: '',
    component: ClasesAlumnoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClasesAlumnoPageRoutingModule {}
