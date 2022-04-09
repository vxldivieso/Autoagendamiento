import { NgModule } from "@angular/core";
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
@NgModule({
    exports:[
        MatToolbarModule,
        MatGridListModule,
        MatStepperModule,
        MatFormFieldModule,
        MatIconModule,
        MatSelectModule,
        MatInputModule
    ]
})

export class MaterialModule{

}