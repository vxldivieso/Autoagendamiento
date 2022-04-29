import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WrongdataComponent } from './wrongdata.component';

const routes: Routes = [
  { path: '', component: WrongdataComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WrongdataRoutingModule { }
