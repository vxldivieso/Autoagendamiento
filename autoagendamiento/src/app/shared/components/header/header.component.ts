import { Component, isDevMode, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { DetailOrderService } from '../../../service/detail.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'] 
})
export class HeaderComponent {
  
  clientData:any;
  order!: number;
  token!: string;
  constructor(private api: DetailOrderService ,private route : ActivatedRoute ) {
    this.order = this.route.snapshot.params['order'];
    this.token = this.route.snapshot.params['token'];
   }

  ngOnInit(): void {
    this.getClientData()
  }
  getClientData(){
    if (isDevMode()) {
      this.api.getOrderDEV(this.order,this.token)
      .subscribe((res:any)=>{
        this.clientData = res.contact;
      })
    }
    else
      this.api.getOrderId(this.order,this.token)
      .subscribe((res:any)=>{
        this.clientData = res.contact;
      })
  }
 
}
