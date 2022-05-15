import { Component, OnInit, Output } from '@angular/core';
import {MatStepper, StepperOrientation} from '@angular/material/stepper';
import { ControlContainer, FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';


@Component({
  selector: 'checkoutproduct',
  templateUrl: './checkoutProduct.component.html',
  styleUrls: ['./checkoutProduct.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class CheckoutProductComponent implements OnInit {
  form!: FormGroup;
  subForm!: FormGroup;

  options: string[] = ['Si', 'No']
  optionselect !: string;

  constructor(private ctrlContainer: FormGroupDirective, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.subForm = this.fb.group({
      optionselect: ['', [Validators.required]],
    });
    this.form = this.ctrlContainer.form;
    this.form.addControl("checkout", this.subForm);
  }
  
}