import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateService } from '../detailOrder/service/detail.service';
import Swal from 'sweetalert2';


@Component({
  selector:'dateProduct',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})

export class DateFormProduct{
  minDate = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate())
  maxDate = new Date(2030, 11, 1); 
  dateProductForm !: FormGroup;
  isSend:boolean = false;

  
  constructor(private formBuilder: FormBuilder, 
    private api: DateService){}
  
  ngOnInit(): void {
    this.dateProductForm = this.formBuilder.group({
      dateProduct: ['',Validators.required],
    })
  }

  onSubmit(): void{
    if(this.dateProductForm.valid){
      this.api.postDateProduct(this.dateProductForm.value)
      .subscribe({
        next:(res)=>{
          this.messageSuccessfull();
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
    Swal.fire({
      icon: 'success',
      title: 'Fecha ingresada correctamente',
      showConfirmButton: true,
      timer: 3000,
      backdrop: true
    })
  }
  //Message Error
  messageError(){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No pudimos completar el proceso',
      showConfirmButton: true,
      backdrop: true
    })
  }

}
