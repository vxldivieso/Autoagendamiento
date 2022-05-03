import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatStepper, StepperOrientation} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SchedulingComponent } from 'src/app/shared/components/scheduling/scheduling.component';



//Stepper component
/**
 * @title Stepper responsive
 */

 export interface DialogData {
  string: '';
}
@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  
})
export class StepperComponent implements OnInit{
  
  isEditable = false;
  checkoutFormGroup!: FormGroup;
  clientDataFormGroup!: FormGroup;
  schedulingFormGroup!: FormGroup;
  endProcessFormGroup!: FormGroup;
  stepperOrientation: Observable<StepperOrientation>;

  constructor(private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver, public dialog: MatDialog) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }
  
  ngOnInit(): void {
    this.checkoutFormGroup = this._formBuilder.group({});
    this.clientDataFormGroup = this._formBuilder.group({});
    this.schedulingFormGroup = this._formBuilder.group({});
    this.endProcessFormGroup = this._formBuilder.group({});
  }

}




/**  Copyright 2022 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */