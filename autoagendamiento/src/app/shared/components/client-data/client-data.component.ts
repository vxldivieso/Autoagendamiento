import { Component, OnInit} from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { text } from 'express';
import Swal from 'sweetalert2';
import { DetailOrderService } from '../../../service/detail.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'client-data',
  templateUrl: './client-data.component.html',
  styleUrls: ['./client-data.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class ClientDataComponent implements OnInit {
  //form control stepper
  form !: FormGroup;
  //form builder html
  clientForm !: FormGroup;
  //variable que recibe los datos
  clientData:any;

  order!: number;
  token!: string;
  constructor( private formBuilder: FormBuilder,
    private api: DetailOrderService, private ctrlContainer: FormGroupDirective
    ,private route : ActivatedRoute) {
      this.order = this.route.snapshot.params['order'];
      this.token = this.route.snapshot.params['token'];
     }

  ngOnInit(): void {
    this.clientForm = this.formBuilder.group({
      name: [''],
      rut: [''],
      email: [''],
      phone: ['',[Validators.minLength(9), Validators.maxLength(9)]],
      phone2: ['', [Validators.minLength(9), Validators.maxLength(9)]],
      address: [''],
      county: [''],
    });
    this.form = this.ctrlContainer.form;
    this.getClientData(); 
  }

  getClientData(){
    this.api.getOrderId(this.order,this.token)
    .subscribe((res:any)=>{
      this.clientData = res.contact;
    })
  }

  updateClientContact(){
    this.clientForm.controls['phone2'].patchValue(this.clientData.phone2);
    if(this.clientForm.valid){
      this.api.putContact(this.clientForm.value, this.order, this.token)
      .subscribe({
        next:(res)=>{
          this.messageSuccessfull();
        },
        error: () =>{
          this.messageError();
        }
      })
    }
  }

  //Message Successfull
  messageSuccessfull(){
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom',
      showConfirmButton: false,
      timer: 3000,
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
      title: 'Guardado'
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
