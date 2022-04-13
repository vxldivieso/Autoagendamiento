import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'checkoutproduct',
  templateUrl: './checkoutProduct.component.html',
  styleUrls: ['./checkoutProduct.component.scss']
})
export class CheckoutProductComponent implements OnInit {
  isTrue = false;
  constructor() { }

  ngOnInit(): void {
  }

  onTrueorFalse(value: boolean): void{
    this.isTrue = value;
  }

}
