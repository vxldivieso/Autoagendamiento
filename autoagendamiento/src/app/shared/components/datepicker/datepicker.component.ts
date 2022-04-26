import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateService } from '../detailOrder/service/detail.service';
import Swal from 'sweetalert2';


@Component({
  selector:'dateProduct',
  templateUrl: './datepicker.component.html',
})


export class DateFormProduct{

  
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }; 


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
      timer: 3000
    })
  }
  //Message Error
  messageError(){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No pudimos completar el proceso',
      showConfirmButton: true,
    })
  }

}
