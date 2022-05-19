import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EjecutivoComponent, ModifyContactComponent, SaveProcessComponent} from './wrongdata.component';

const routes: Routes = [
  { path: 'ejecutivo', component: EjecutivoComponent },
  { path: 'save', component: SaveProcessComponent},
  { path: 'data', component:ModifyContactComponent}
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WrongdataRoutingModule { }
