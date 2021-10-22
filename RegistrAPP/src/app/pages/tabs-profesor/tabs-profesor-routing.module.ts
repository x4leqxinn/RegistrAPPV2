import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsProfesorPage } from './tabs-profesor.page';

const routes: Routes = [
  {
    path: '',
    component: TabsProfesorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsProfesorPageRoutingModule {}
