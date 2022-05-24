import {AfterViewInit, Component, Inject, Input, isDevMode, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatStepper, StepperOrientation} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
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
  scheduled_at:any;
  order_visit_status : any;
  order_status:any;
  order!: any;
  token!: string;
  
  constructor(private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver, 
    public dialog: MatDialog,  private route : ActivatedRoute, private api: DetailOrderService, private router : Router) {
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
        this.scheduled_at = resp.scheduled_at;
        this.details = resp
        this.order_status = resp.order_status
        this.order_visit_status = resp.order_visit_status;
        this.processEnd()
      })
    }
    else
      this.api.getOrderId(this.order, this.token).subscribe((resp:any)=>{
        this.scheduled_at = resp.scheduled_at;
        this.details = resp
        this.order_visit_status = resp.order_visit_status;
        this.processEnd()
      })
  }

  processEnd(){
    if(this.order_visit_status == 'in_campaing'){
      this.move(0)
    }
    if(this.order_visit_status == 'contact_support'){
      this.router.navigate([`${this.order}/${this.token}/contact/ejecutivo`])
    }
    if(this.order_visit_status == 'need_correction'){
      this.router.navigate([`${this.order}/${this.token}/contact/data`])
    }
    if(this.order_visit_status == 'wait_for_schedule'){
      this.router.navigate([`${this.order}/${this.token}/contact/save`])
    }
    if (this.scheduled_at != undefined){
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