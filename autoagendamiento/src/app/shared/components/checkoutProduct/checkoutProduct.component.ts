import { Component, OnInit, Output } from '@angular/core';
import { CheckoutService } from './service/checkout.service';
import {MatStepper, StepperOrientation} from '@angular/material/stepper';
import { ControlContainer, FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';


@Component({
  selector: 'checkoutproduct',
  templateUrl: './checkoutProduct.component.html',
  styleUrls: ['./checkoutProduct.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class CheckoutProductComponent implements OnInit {
  //variables hidden forms
  isFalse = false;
  isTrue = false;
  
  form!: FormGroup;
  subForm!: FormGroup;

  constructor(private api : CheckoutService, private ctrlContainer: FormGroupDirective, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.subForm = this.fb.group({
      haveProduct: ['', [Validators.required]],
    });
    this.form = this.ctrlContainer.form;
    this.form.addControl("checkout", this.subForm);
  }
  //Have product or no (radio button)
  onTrueorFalse(value: boolean): void{
    this.isTrue = value;
    this.isFalse = value;
    this.onSubmit();
  }
  //Post
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


