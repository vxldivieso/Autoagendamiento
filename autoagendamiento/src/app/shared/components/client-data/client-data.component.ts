import { Component, isDevMode, OnInit} from '@angular/core';
import { ControlContainer, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { text } from 'express';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router'; 
import { DetailOrderService } from 'src/app/service/detail.service';
import { MatDialog } from '@angular/material/dialog';

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

  updateClientContact(){
    if (isDevMode()) {
      this.clientForm.controls['phone2'].patchValue(this.clientData.phone2);
      if(this.clientForm.valid){
        this.api.putContactDEV(this.clientForm.value, this.order, this.token)
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
    else
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

@Component({
  selector: 'app-wrongdata',
  templateUrl: './wrong.component.html',
  styleUrls: ['./wrong.component.scss']
})
export class WrongdataComponent implements OnInit {
  form!: FormGroup;
  checked !: boolean
  constructor() { 
    this.form = new FormGroup({
      nombre: new FormControl({
        value: ''
      }),
      direccion: new FormControl({
        value: ''
      }),
      ciudad: new FormControl({
        value: ''
      }),
    });
  }
  
  ngOnInit(): void {
    
  }





}

@Component({
  selector: 'button-wrongdata',
  template: `
  <button mat-raised-button color="accent" (click)="openDialog()">Los datos son incorrectos</button>
  
  `,
  styleUrls: ['./wrong.component.scss'],
})
export class WrongDataDialog{
  constructor(private dialog: MatDialog ){}
  openDialog() {
    this.dialog.open(WrongdataComponent, {
      width:'500px'
    });
  }
}