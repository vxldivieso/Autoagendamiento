import { AfterViewInit, Component, isDevMode, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DetailOrderService } from 'src/app/service/detail.service';
import  {trigger, style, transition, animate,state } from '@angular/animations';
import * as moment from 'moment';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-end-process',
  templateUrl: './end-process.component.html',
  styleUrls: ['./end-process.component.scss'],
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
export class EndProcessComponent implements OnInit, AfterViewInit{
  savedDate: any ;
  details : any;
  clientData : any;
  scheduled_at:any;
  form !: FormGroup;
  dates = (value:string) => {return moment(value).format('dddd, DD-MM-YYYY')}
  
  

  order!: any;
  token!: string;
  constructor(private apiDet : DetailOrderService, private ctrlContainer: FormGroupDirective,
    private route : ActivatedRoute) {
      this.order = this.route.snapshot.params['order'];
      this.token = this.route.snapshot.params['token'];
      moment.locale('es');
    }

  ngOnInit(): void {
    this.getDetailOrder()
    this.getClientData()
    this.form = this.ctrlContainer.form;
  }

  ngAfterViewInit(): void {
    this.getSavedDate()
  }

  getSavedDate(){
    if (isDevMode()) {
      this.apiDet.getOrderDEV(this.order,this.token).subscribe((res:any)=>{
        this.savedDate = {
          date: res.scheduled_at.day,
          block: ["9:00 - 11:00","11:00 - 13:00"].includes(res.scheduled_at.block)? "09:00 am - 13:00 pm" : "13:00 pm - 19:00 pm"
        }
      })
    }
    else
    this.apiDet.getOrderId(this.order,this.token).subscribe((res:any)=>{
      this.savedDate = {
        date: res.scheduled_at.day,
        block: ["9:00 - 11:00","11:00 - 13:00"].includes(res.scheduled_at.block)? "09:00 am - 13:00 pm" : "13:00 pm - 19:00 pm"
      }
    })
  }
  
  getDetailOrder(){
    if (isDevMode()) {
      this.apiDet.getOrderDEV(this.order,this.token)
      .subscribe({
        next:(res)=>{
          this.details = res;
          this.scheduled_at = res.scheduled_at
          console.log(this.scheduled_at);
          
        }
      })
    }
    else
    this.apiDet.getOrderId(this.order,this.token)
    .subscribe({
      next:(res)=>{
        this.details = res;
      }
    })
  }

  getClientData(){
    if (isDevMode()) {
      this.apiDet.getOrderDEV(this.order,this.token)
      .subscribe((res:any)=>{
        this.clientData = res.contact;
      })
    }
    else
    this.apiDet.getOrderId(this.order,this.token)
    .subscribe((res:any)=>{
      this.clientData = res.contact;
    })
  }
  

}
  