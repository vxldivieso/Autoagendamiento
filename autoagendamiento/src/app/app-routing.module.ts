import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren:() => import('./pages/stepper/stepper.module').then(m=>m.StepperModule)},
  {path: 'contact', loadChildren: () => import('./pages/wrongdata/wrongdata.module').then(m => m.WrongdataModule) },
  {path: '**', redirectTo:'', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
