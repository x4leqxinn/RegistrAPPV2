import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsistenciasProfesorPage } from './asistencias-profesor.page';

const routes: Routes = [
  {
    path: '',
    component: AsistenciasProfesorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsistenciasProfesorPageRoutingModule {}
