import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WrongdataRoutingModule } from './wrongdata-routing.module';
import { EjecutivoComponent, WrongdataComponent } from './wrongdata.component';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [
    WrongdataComponent,
    EjecutivoComponent
  ],
  imports: [
    CommonModule,
    WrongdataRoutingModule,
    MaterialModule
  ]
})
export class WrongdataModule { }
