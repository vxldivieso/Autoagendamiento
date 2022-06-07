import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WrongdataRoutingModule } from './wrongdata-routing.module';
import { EjecutivoComponent, ModifyContactComponent, SaveProcessComponent} from './wrongdata.component';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [
    EjecutivoComponent,
    SaveProcessComponent,
    ModifyContactComponent
  ],
  imports: [
    CommonModule,
    WrongdataRoutingModule,
    MaterialModule
  ]
})
export class WrongdataModule { }
