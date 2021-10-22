import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapaPageRoutingModule } from './mapa-routing.module';

import { MapaPage } from './mapa.page';

// Importamos para usar el Mapa
import { AgmCoreModule } from '@agm/core';
//
import { environment } from 'src/environments/environment';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapaPageRoutingModule,
    AgmCoreModule.forRoot({ // Importamos para usar la Key de Google Maps
      apiKey: environment.mapsKeyApi
    })
  ],
  declarations: [MapaPage]
})
export class MapaPageModule {}
