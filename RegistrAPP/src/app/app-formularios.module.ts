import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Importamos FormsModule y ReactiveFormsModule
import { FormsModule} from '@angular/forms';
import{ ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],exports: [
    // FormsModule y Reactive Module
    ReactiveFormsModule,
    FormsModule, 
  ]
})
export class AppFormulariosModule { }
