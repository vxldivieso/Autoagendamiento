import { NgModule } from "@angular/core";
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio"
import { MatNativeDateModule } from "@angular/material/core";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
    exports:[
        MatToolbarModule,
        MatGridListModule,
        MatStepperModule,
        MatFormFieldModule,
        MatIconModule,
        MatSelectModule,
        MatInputModule,
        MatRadioModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatDialogModule,
        MatButtonModule,
        
    ]
})

export class MaterialModule{

}