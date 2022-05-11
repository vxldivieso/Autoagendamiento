import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WrongdataRoutingModule } from './wrongdata-routing.module';
import { EjecutivoComponent} from './wrongdata.component';
import { MaterialModule } from 'src/app/material.module';
import { HeaderComponent } from 'ag-grid-community/dist/lib/components/framework/componentTypes';


@NgModule({
  declarations: [
    EjecutivoComponent
  ],
  imports: [
    CommonModule,
    WrongdataRoutingModule,
    MaterialModule
  ]
})
export class WrongdataModule { }
