import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WrongdataRoutingModule } from './wrongdata-routing.module';
import { WrongdataComponent } from './wrongdata.component';


@NgModule({
  declarations: [
    WrongdataComponent
  ],
  imports: [
    CommonModule,
    WrongdataRoutingModule
  ]
})
export class WrongdataModule { }
