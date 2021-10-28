import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsignaturasProfesorPage } from './asignaturas-profesor.page';

const routes: Routes = [
  {
    path: '',
    component: AsignaturasProfesorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsignaturasProfesorPageRoutingModule {}
