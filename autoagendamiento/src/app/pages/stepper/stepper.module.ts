import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MatNativeDateModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { MaterialModule } from "src/app/material.module";
import { StepperRoutingModule } from "./stepper-routing.module";

@NgModule({
    declarations: [

    ],
    imports: [
        CommonModule,
        StepperRoutingModule,
        MatNativeDateModule,
        HttpClientModule,
        MaterialModule,
        MatIconModule
    ]
})

export class StepperModule{
    
}