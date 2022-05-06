import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EjecutivoComponent, WrongdataComponent } from './wrongdata.component';

const routes: Routes = [
  { path: '', component: WrongdataComponent },
  { path: 'ejecutivo', component: EjecutivoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WrongdataRoutingModule { }
