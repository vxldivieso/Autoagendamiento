import { AfterViewInit, Component, isDevMode, OnInit, Output, ViewChild } from '@angular/core';
import {MatStepper, StepperOrientation} from '@angular/material/stepper';
import { ControlContainer, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { DateService } from 'src/app/service/detail.service';
import { ActivatedRoute } from '@angular/router';
import { DateFormProduct } from '../datepicker/datepicker.component';


@Component({
  selector: 'checkoutproduct',
  templateUrl: './checkoutProduct.component.html',
  styleUrls: ['./checkoutProduct.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class CheckoutProductComponent implements OnInit{
  form!: FormGroup;
  subForm!: FormGroup;

  options: string[] = ['Si', 'No']
  optionselect !: string;

  delivery_date = new Date() ;
  //params
  order!: any;
  token!: string;

  constructor(private ctrlContainer: FormGroupDirective, private fb: FormBuilder,
    private api: DateService, private route : ActivatedRoute) { 
    this.order = this.route.snapshot.params['order'];
      this.token = this.route.snapshot.params['token'];
  }
    
  ngOnInit(): void {
    this.subForm = this.fb.group({
      optionselect: ['', [Validators.required]],
    });
    
    this.form = this.ctrlContainer.form;
    this.form.addControl("checkout", this.subForm);
    this.getDeliveryDate()
  }
  

  getDeliveryDate(){
    if (isDevMode()) {
      this.api.getOrderIdDEV(this.order, this.token)
      .subscribe((res:any)=>{
        this.delivery_date = res.delivery_date;
      })
    }
    else
      this.api.getOrderId(this.order, this.token)
      .subscribe((res:any)=>{
        this.delivery_date = res.delivery_date;
      })
  } 
  
}