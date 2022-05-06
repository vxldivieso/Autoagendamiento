import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { DateService } from '../../../service/detail.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common'

import  {trigger, style, transition, animate,state } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector:'dateProduct',
  templateUrl: './datepicker.component.html', 
  styleUrls: ['./datepicker.component.scss'],
  providers: [DatePipe],
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

export class DateFormProduct{
  minDate = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate())
  maxDate = new Date(2030, 11, 1); 
  dateProductForm !: FormGroup;
  isSend:boolean = false;
  delivery_date : any;
  datedelivery : any;

  order!: number;
  token!: string;
  
  constructor(private formBuilder: FormBuilder, 
    private api: DateService, public datepipe: DatePipe, private route : ActivatedRoute){
      this.order = this.route.snapshot.params['order'];
      this.token = this.route.snapshot.params['token'];
    }
  
  ngOnInit(): void {
    this.dateProductForm = this.formBuilder.group({
      dateProduct: ['',Validators.required],
    });
  }

  getDeliveryDate(){
    this.api.getOrderId(this.order, this.token)
    .subscribe((res:any)=>{
      this.delivery_date = res.delivery_date;
    })
  }

  transformDate(){
    let obj = this.dateProductForm.value
    this.datedelivery = (JSON.stringify(obj));
    return this.datedelivery
  }

  onSubmit(){
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
