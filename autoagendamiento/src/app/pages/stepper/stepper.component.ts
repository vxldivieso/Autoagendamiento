import {Component, Inject} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';




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
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  fourFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>;

  constructor(private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver, public dialog: MatDialog) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  openDialog() {
    this.dialog.open(DialogDataExampleDialog,
      {width:'500px'}
      );
  }

}

@Component({
  selector: 'dialog-data-example-dialog',
  template:`
  <h1 mat-dialog-title class="text-center">Condiciones del Servicio</h1>
  <div mat-dialog-content >
  <p>Cajas deben encontrarse selladas</p>
  <p>Las cajas deben estar en el lugar exacto donde va a quedar producto armado para uso</p>
  <p>Debe contar con el espacio suficiente para que técnico pueda manipular las piezas</p>
  </div>
  <div mat-dialog-actions [align]="'center'" >
  <button mat-raised-button mat-dialog-close>Cerrar</button>
  <button mat-raised-button color="primary">Agendar</button>
</div>`,
  styleUrls: ['./stepper.component.scss'],
})
export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}



/**  Copyright 2022 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */