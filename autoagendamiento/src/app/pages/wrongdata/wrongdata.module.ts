import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WrongdataRoutingModule } from './wrongdata-routing.module';
import { WrongdataComponent } from './wrongdata.component';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [
    WrongdataComponent
  ],
  imports: [
    CommonModule,
    WrongdataRoutingModule,
    MaterialModule
  ]
})
export class WrongdataModule { }
