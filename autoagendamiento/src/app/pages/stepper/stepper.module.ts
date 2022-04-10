import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MatNativeDateModule } from "@angular/material/core";
import { MaterialModule } from "src/app/material.module";
import { ClientDataComponent } from "src/app/shared/components/client-data/client-data.component";
import { RadiobuttonComponent } from "src/app/shared/components/radiobutton/radiobutton.component";
import { StepperRoutingModule } from "./stepper-routing.module";

@NgModule({
    declarations: [

    ],
    imports: [
        CommonModule,
        StepperRoutingModule,
        MatNativeDateModule,
        HttpClientModule,
        MaterialModule
    ]
})

export class StepperModule{
    
}