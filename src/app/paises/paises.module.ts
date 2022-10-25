import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaisesRoutingModule } from './paises-routing.module';
import { PaisesComponent } from './components/paises.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PaisesComponent
  ],
  imports: [
    CommonModule,
    PaisesRoutingModule,
    ReactiveFormsModule,
  ]
})
export class PaisesModule { }
