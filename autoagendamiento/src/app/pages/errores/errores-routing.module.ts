import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component, ErrorComponent } from './errores.component';
 
const routes: Routes = [
    {path: '', component: ErrorComponent},
    {path: '404', component: Error404Component} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)], 
  exports: [RouterModule]
})
export class ErroresRoutingModule { }
