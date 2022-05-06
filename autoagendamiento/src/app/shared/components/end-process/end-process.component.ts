import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DetailOrderService } from '../../../service/detail.service';

@Component({
  selector: 'app-end-process',
  templateUrl: './end-process.component.html',
  styleUrls: ['./end-process.component.scss']
})
export class EndProcessComponent implements OnInit, AfterViewInit{
  savedDate: any ;
  details : any;
  clientData : any;

  form !: FormGroup;

  order!: number;
  token!: string;
  constructor(private apiDet : DetailOrderService, private ctrlContainer: FormGroupDirective,
    private route : ActivatedRoute) {
      this.order = this.route.snapshot.params['order'];
      this.token = this.route.snapshot.params['token'];
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
    this.apiDet.getOrderId(this.order,this.token).subscribe((res:any)=>{
      this.savedDate = {
        date: res.scheduled_at.day,
        block: [1,2].includes(res.scheduled_at.block)? "09:00 am - 13:00 pm" : "13:00 pm - 19:00 pm"
      }
    })
  }
  
  getDetailOrder(){
    this.apiDet.getOrderId(this.order,this.token)
    .subscribe({
      next:(res)=>{
        this.details = res;
      }
    })
  }

  getClientData(){
    this.apiDet.getOrderId(this.order,this.token)
    .subscribe((res:any)=>{
      this.clientData = res.contact;
    })
  }
  

}
 