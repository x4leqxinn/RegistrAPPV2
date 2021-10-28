import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CursosProfesorPage } from './cursos-profesor.page';

const routes: Routes = [
  {
    path: '',
    component: CursosProfesorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursosProfesorPageRoutingModule {}
