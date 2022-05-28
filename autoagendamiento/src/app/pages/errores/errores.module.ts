import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MatNativeDateModule } from "@angular/material/core";
import { MaterialModule } from "src/app/material.module";
import { ErroresRoutingModule } from "./errores-routing.module";
import { Error404Component, ErrorComponent } from "./errores.component";

@NgModule({
    declarations: [
      ErrorComponent,
      Error404Component  
    ],
    imports: [
        CommonModule,
        ErroresRoutingModule,
        MatNativeDateModule,
        HttpClientModule,
        MaterialModule
    ]
})

export class ErroresModule{
    
}