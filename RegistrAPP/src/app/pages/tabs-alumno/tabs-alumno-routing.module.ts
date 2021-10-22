import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsAlumnoPage } from './tabs-alumno.page';

const routes: Routes = [
  {
    path: '',
    component: TabsAlumnoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsAlumnoPageRoutingModule {}
