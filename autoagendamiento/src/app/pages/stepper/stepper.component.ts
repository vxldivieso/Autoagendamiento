import {Component, Inject} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CheckoutProductComponent } from 'src/app/shared/components/checkoutProduct/checkoutProduct.component';
import { ClientDataComponent } from 'src/app/shared/components/client-data/client-data.component';
import { SchedulingComponent } from 'src/app/shared/components/scheduling/scheduling.component';
import { EndProcessComponent } from 'src/app/shared/components/end-process/end-process.component';



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
export class StepperComponent {
  isEditable = false;
  firstFormGroup = this._formBuilder.group({
    firstCtrl: [CheckoutProductComponent, Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: [ClientDataComponent, Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: [SchedulingComponent, Validators.required],
  });
  fourFormGroup = this._formBuilder.group({
    fourCtrl: [EndProcessComponent, Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>;

  constructor(private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver, public dialog: MatDialog) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

}


/**  Copyright 2022 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */