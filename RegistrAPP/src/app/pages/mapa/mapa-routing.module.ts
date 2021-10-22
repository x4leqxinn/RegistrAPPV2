import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapaPage } from './mapa.page';

import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';

const routes: Routes = [
  {
    path: '',
    component: MapaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    AgmCoreModule.forRoot({ // Importamos para usar la Key de Google Maps
      apiKey: environment.mapsKeyApi
    })],
  exports: [RouterModule],
})
export class MapaPageRoutingModule {}


