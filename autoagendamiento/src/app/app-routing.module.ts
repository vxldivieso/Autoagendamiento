import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: ':order/:token', loadChildren:() => import('./pages/stepper/stepper.module').then(m=>m.StepperModule)},
  {path: ':order/:token/wrong', loadChildren: () => import('./pages/wrongdata/wrongdata.module').then(m => m.WrongdataModule) },
  {path: 'error',loadChildren: () => import('./pages/errores/errores.module').then(m=>m.ErroresModule)},
  {path: '**', redirectTo:'error', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
