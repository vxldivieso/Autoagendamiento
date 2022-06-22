import { AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, isDevMode, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { DateService } from '../../../service/detail.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common'
import  {trigger, style, transition, animate,state } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment'
import { DateAdapter } from '@angular/material/core';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import { CheckoutProductComponent } from '../checkoutProduct/checkoutProduct.component';


@Component({
  selector:'dateProduct',
  templateUrl: './datepicker.component.html', 
  styleUrls: ['./datepicker.component.scss'],
  providers: [DatePipe,{ provide: MAT_DATE_LOCALE, useValue: 'es' }],
  animations:[
    trigger('enterState',[
      state('void',style({
        opacity: 0 
      })),
      transition(':enter',[
        animate(300,style({
          opacity: 1
        }))
      ])
    ])
  ]
})

export class DateFormProduct implements OnInit, AfterViewChecked{
  minDate = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate())
  maxDate = new Date(2030, 11, 1); 
  dateProductForm !: FormGroup;
  isSend:boolean = false;
  delivery_date = new Date() ;
  datedelivery : any;
  visible:boolean = true;
  store :any;
  //params
  order!: any;
  token!: string;
  
  form!: FormGroup;
  @ViewChild (CheckoutProductComponent) child !: CheckoutProductComponent;
  
  constructor(private formBuilder: FormBuilder, 
    private api: DateService, public datepipe: DatePipe, private route : ActivatedRoute, date: DateAdapter<Date>,
    private ctrlContainer: FormGroupDirective){
      this.order = this.route.snapshot.params['order'];
      this.token = this.route.snapshot.params['token'];

      date.getFirstDayOfWeek = () => 1;
      date.setLocale('es');
    }
  
  ngOnInit(): void {
    this.dateProductForm = this.formBuilder.group({
      dateProduct: ['',Validators.required]
    });
    this.getDeliveryDate()
    
    
  }

  ngAfterViewChecked(): void {
    
    if(this.store == 'ABCDIN'){
      this.form = this.ctrlContainer.form;
      this.form.addControl("date", this.dateProductForm);
    }
    
    
  }
  
  getDeliveryDate(){
    if (isDevMode()) {
      this.api.getOrderIdDEV(this.order, this.token)
      .subscribe((res:any)=>{
        this.delivery_date = res.delivery_date;
        this.store = res.store
      })
      
    }
    else
      this.api.getOrderId(this.order, this.token)
      .subscribe((res:any)=>{
        this.delivery_date = res.delivery_date;
        this.store = res.store
      })
      if(this.store== 'ABCDIN'){
        this.form.addControl("date", this.dateProductForm);
      }
  }

  transformDate(){
    const myFormat= 'YYYY-MM-DD'
    let obj = this.dateProductForm.value
    this.datedelivery = {delivery_date:moment(obj.dateProduct).format(myFormat)};
    return this.datedelivery
  }
  
  onSubmit(){
    this.transformDate()
    if (isDevMode()) {
      if(this.dateProductForm.valid){
        this.api.putDateDeliveryDEV(this.datedelivery, this.order, this.token)
        .subscribe({
          next:(res)=>{
            this.messageSuccessfull()
            this.isSend = !this.isSend;
            
          },
          error: () =>{
            this.messageError();
          }
        })
      }

    }
    else
      if(this.dateProductForm.valid){
        this.api.putDateDelivery(this.datedelivery, this.order, this.token)
        .subscribe({
          next:(res)=>{
            this.messageSuccessfull()
            this.isSend = !this.isSend;
          },
          error: () =>{
            this.messageError();
          }
        })
      }
  }

//Message successfull
messageSuccessfull(){
  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    customClass: {
      popup: 'colored-toast'
    },
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  Toast.fire({
    icon: 'success',
    title: 'Fecha guardada correctamente',
  })
}
//Message Error
messageError(){
  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  Toast.fire({
    icon: 'error',
    title: 'Ups.. Algo ocurrió'
  })
}

}


