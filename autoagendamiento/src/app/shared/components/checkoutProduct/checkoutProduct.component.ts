import { Component, OnInit, Output } from '@angular/core';
import { CheckoutService } from './service/checkout.service';

@Component({
  selector: 'checkoutproduct',
  templateUrl: './checkoutProduct.component.html',
  styleUrls: ['./checkoutProduct.component.scss']
})
export class CheckoutProductComponent implements OnInit {
  //variables hidden forms
  isFalse = false;
  isTrue = false;
  
  constructor(private api : CheckoutService) { }

  ngOnInit(): void {
  }

  onTrueorFalse(value: boolean): void{
    this.isTrue = value;
    this.isFalse = value;
    this.onSubmit();
  }

  onSubmit(){
    this.api.postCheckout(this.isFalse).subscribe(
      {
        next:(res)=>{
          console.log('Tiene el producto en sus manos? si es true, no lo tiene, si es false, si lo tiene', res);
        },
        error: (res) =>{
          console.log('error');
          
        }
      }
    )
  }
}

