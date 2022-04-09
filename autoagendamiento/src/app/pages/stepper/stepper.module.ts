import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MatNativeDateModule } from "@angular/material/core";
import { StepperRoutingModule } from "./stepper-routing.module";

@NgModule({
    declarations: [

    ],
    imports: [
        CommonModule,
        StepperRoutingModule,
        MatNativeDateModule,
        HttpClientModule,
    ]
})

export class StepperModule{
    
}