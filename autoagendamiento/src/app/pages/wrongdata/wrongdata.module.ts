import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WrongdataRoutingModule } from './wrongdata-routing.module';
import { EjecutivoComponent, ModifyContactComponent, SaveProcessComponent} from './wrongdata.component';
import { MaterialModule } from 'src/app/material.module';
import { HeaderComponent } from 'ag-grid-community/dist/lib/components/framework/componentTypes';


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
