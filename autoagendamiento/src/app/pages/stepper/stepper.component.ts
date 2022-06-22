import {Component, Injectable, isDevMode, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatStepper, StepperOrientation} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailOrderService } from 'src/app/service/detail.service';
import * as moment from 'moment';
import { TaskService } from 'src/app/service/task.service';
import { INGXLoggerConfig, INGXLoggerMetadata, NGXLogger, NgxLoggerLevel, NGXLoggerWriterService } from "ngx-logger";
import { CheckoutProductComponent } from 'src/app/shared/components/checkoutProduct/checkoutProduct.component';

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
  providers: [
    { provide: Window, useValue: window }
  ]
})
export class StepperComponent implements OnInit{
  
  isEditable = false;
  checkoutFormGroup!: FormGroup;
  clientDataFormGroup!: FormGroup;
  schedulingFormGroup!: FormGroup;
  endProcessFormGroup!: FormGroup;
  stepperOrientation: Observable<StepperOrientation>;


  @ViewChild('stepper') stepper!: MatStepper;
  savedDate: any ;
  details : any;
  clientData : any;
  scheduled_at:any;
  requestId:any;
  requestOrder:any;
  order_visit_status : any;
  order_status:any;
  order!: any;
  token!: string;
  id!:string | null;

  //task var
  status: string = 'all';
  kindTask : any;
  detailsTask : any;
  taskOrder : any;
  completed_at : any;

  dates = (value:string) => {return moment(value).format('dddd, DD-MM-YYYY')}

  @ViewChild (CheckoutProductComponent) option !: CheckoutProductComponent;

  constructor(
    private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver, 
    public dialog: MatDialog,  private route : ActivatedRoute, 
    private api: DetailOrderService, private router : Router, private task : TaskService, private window: Window, 
    private logger: NGXLogger) {
      this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));

      this.order = this.route.snapshot.params['order'];
      this.token = this.route.snapshot.params['token'];
    }

  log(lvl:any){
    switch(lvl){
      case 0:
        if (this.option.optionselect == 'Si'){
          this.logger.info('Vista 1 - Cliente ya tiene el producto en sus manos')
        }
        else
          this.logger.info('Vista 1 - Cliente aún no tiene el producto en sus manos') 
      break;
    }
  }
  
  ngOnInit(): void {
    this.checkoutFormGroup = this._formBuilder.group({});
    this.clientDataFormGroup = this._formBuilder.group({});
    this.schedulingFormGroup = this._formBuilder.group({});
    this.endProcessFormGroup = this._formBuilder.group({});
    this.getOrderId()
    this.getTask()
  }

  continue(){
    
      if (this.checkoutFormGroup.valid){
        this.log(0);
      }
    
    
  }

  getOrderId(){
    if (isDevMode()) {
      this.api.getOrderDEV(this.order, this.token).subscribe((resp:any)=>{
        this.scheduled_at = resp.scheduled_at;
        this.details = resp
        this.clientData = resp.contact
        this.order_status = resp.order_status
        this.order_visit_status = resp.order_visit_status;
        this.requestId = resp.request_id;
        this.statusOrder();
        this.principalView();
      })
    }
    else
      this.api.getOrderId(this.order, this.token).subscribe((resp:any)=>{
        this.scheduled_at = resp.scheduled_at;
        this.details = resp
        this.clientData = resp.contact
        this.order_status = resp.order_status
        this.order_visit_status = resp.order_visit_status;
        this.requestId = resp.request_id;
        this.statusOrder();
        this.principalView();
      })
  }

  getRequestOrder(){
    if (isDevMode()) {
      this.api.getRequestOrderDEV(this.requestId, this.token).subscribe((resp:any)=>{
        this.requestOrder = resp;
      })
    }
    else
    this.api.getRequestOrder(this.requestId, this.token).subscribe((resp:any)=>{
      this.requestOrder = resp;
    })

  }

  getTask(){
    let task = '';
    let kind = '';
    let details = '';
    let completed_at = '';
    if (isDevMode()) {
      this.task.getTaskDEV(this.status, this.order, this.token).subscribe((res: any) =>{
        res.forEach(function(res: any) {
          task = res
          kind = res.kind
          details = res.details
          completed_at = res.completed_at
        })
        this.taskOrder = task;
        this.kindTask = kind
        this.detailsTask = details
        this.completed_at = completed_at
      })
    }
    else
    this.task.getTask(this.status, this.order, this.token).subscribe((res: any) =>{
      res.forEach(function(res: any) {
        task = res
        kind = res.kind
        details = res.details
        completed_at = res.completed_at
      })
      this.taskOrder = task;
      this.kindTask = kind
      this.detailsTask = details
      this.completed_at = completed_at
    })
  }
 

  statusOrder(){
    if(this.order_visit_status == 'in_campaing'){
      this.move(0);

      if(this.kindTask == 'need_correction' && this.detailsTask == 'Necesita corrección de datos' && this.completed_at != null ){
        this.stepper.linear = false;
        this.move(2)    
      }
      
      if(this.kindTask == 'contact_support' && this.detailsTask == 'Necesita contactarse con un ejecutivo.' && this.completed_at != null){
        this.stepper.linear = false;
        this.move(2)
      }
      if(this.kindTask == 'contact_support' && this.detailsTask == 'No encuentra disponibilidad' && this.completed_at != null){
        this.stepper.linear = false;
        this.move(2)
      }
    }

    if(this.order_visit_status == 'need_correction'){
      if(this.completed_at == null ){
        this.router.navigate([`${this.order}/${this.token}/contact/data`])      
      }
    }

    if(this.order_visit_status == 'contact_support'){
      if(this.kindTask == 'contact_support'){
        if(this.detailsTask == 'Campaña no ejecutada'){
          this.stepper.linear = false;
          this.move(0);
        }
        if(this.detailsTask == 'Necesita contactarse con un ejecutivo.' && this.completed_at == null){
          this.router.navigate([`${this.order}/${this.token}/contact/ejecutivo`])
        }
        if(this.detailsTask == 'No encuentra disponibilidad' && this.completed_at == null){
          this.router.navigate([`${this.order}/${this.token}/contact/ejecutivo`])
        }
      }
     
    }
    
    if(this.order_visit_status == 'wait_for_schedule'){
      this.router.navigate([`${this.order}/${this.token}/contact/save`])
    }
  }

  principalView(){
    if (this.scheduled_at != undefined){
      this.stepper.linear = false;
      this.move(3)
    }
  }

  move(index: number) {
    this.stepper.selectedIndex = index;
  }

  //logs
  

}



/**  Copyright 2022 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */