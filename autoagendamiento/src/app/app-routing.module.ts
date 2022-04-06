import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren:() => import('./pages/stepper/stepper.module').then(m=>m.StepperModule)},
  {path: '**', redirectTo:'', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
