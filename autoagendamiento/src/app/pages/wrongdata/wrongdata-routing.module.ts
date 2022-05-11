import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EjecutivoComponent} from './wrongdata.component';

const routes: Routes = [
  { path: 'ejecutivo', component: EjecutivoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WrongdataRoutingModule { }
