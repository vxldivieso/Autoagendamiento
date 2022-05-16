import {AfterViewInit, Component, Inject, Input, isDevMode, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatStepper, StepperOrientation} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DetailOrderService } from 'src/app/service/detail.service';


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

  @ViewChild('stepper') stepper!: MatStepper;
  details:any;
  status_order : any;
  order!: number;
  token!: string;
  
  constructor(private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver, 
    public dialog: MatDialog,  private route : ActivatedRoute, private api: DetailOrderService) {
      this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));

      this.order = this.route.snapshot.params['order'];
      this.token = this.route.snapshot.params['token'];
    }
  
  ngOnInit(): void {
    this.checkoutFormGroup = this._formBuilder.group({});
    this.clientDataFormGroup = this._formBuilder.group({});
    this.schedulingFormGroup = this._formBuilder.group({});
    this.endProcessFormGroup = this._formBuilder.group({});
    this.getOrderId()
  }

  getOrderId(){
    if (isDevMode()) {
      this.api.getOrderDEV(this.order, this.token).subscribe((resp:any)=>{
        this.details = resp.scheduled_at;
        this.status_order = resp.order_status;
        this.processEnd()
      })
    }
    else
      this.api.getOrderId(this.order, this.token).subscribe((resp:any)=>{
        this.details = resp.scheduled_at;
        this.status_order = resp.order_status;
        this.processEnd()
      })
  }

  processEnd(){
    if (this.details != undefined){
      this.stepper.linear = false;
      this.move(3)
    }

  }

  move(index: number) {
    this.stepper.selectedIndex = index;
  }
  

}

/**  Copyright 2022 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */