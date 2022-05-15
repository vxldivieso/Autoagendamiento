import { Component, Inject, isDevMode, OnInit, ViewChild, ViewChildren} from '@angular/core';
import { ControlContainer, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { text } from 'express';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router'; 
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetailOrderService } from 'src/app/service/detail.service';
import  {trigger, style, transition, animate,state } from '@angular/animations';
import { CdkStepper } from '@angular/cdk/stepper';
import { DialogData } from 'src/app/pages/stepper/stepper.component';
import { MatStepper } from '@angular/material/stepper';

@Component({ 
  selector: 'client-data',
  templateUrl: './client-data.component.html',
  styleUrls: ['./client-data.component.scss'],
  animations:[
    trigger('enterState',[
      state('void',style({
        opacity: 0 
      })),
      transition(':enter',[
        animate(300,style({
          opacity: 1
        }))
      ])
    ])
  ],
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
    ,private route : ActivatedRoute, private cdk : CdkStepper) {
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
    this.form.addControl("clientData", this.clientForm);
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
    this.clientForm.controls['phone2'].patchValue(this.clientData.phone2);
    if (isDevMode()) {
      if(this.clientForm.valid){
        this.api.putContactDEV(this.clientForm.value, this.order, this.token)
        .subscribe({
          next:(res)=>{
            this.messageSuccessfull();
            this.cdk.next()
          },
          error: () =>{
            this.messageError();
          }
        })
      }
    }
    else
      if(this.clientForm.valid){
        this.api.putContact(this.clientForm.value, this.order, this.token)
        .subscribe({
          next:(res)=>{
            this.messageSuccessfull();
            this.cdk.next();
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
      timer: 2000,
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
      timer: 2000,
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
  styleUrls: ['./wrong.component.scss'],
  providers: [{ provide: CdkStepper}]
})
export class WrongdataComponent implements OnInit {
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, private cdk: CdkStepper
) {
    
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      direccion: [''],
      comuna: ['']
    })
  }


  onSubmit(){
    if (this.form.valid){
      console.log(this.form.value);
      this.dialog.closeAll();
      this.messageSuccessfull()
    }
  }

  //Message successfull
  messageSuccessfull(){
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom',
      showConfirmButton: false,
      timer: 2000,
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


}

@Component({
  selector: 'button-wrongdata',
  template: `
  <div class="d-grid d-md-flex justify-content-md-center">
    <button mat-raised-button color="accent" (click)="openDialog()">Datos Incorrectos</button>
  </div>
  
  
  `,
  styleUrls: ['./wrong.component.scss'],
})
export class WrongDataDialog{
  constructor(private dialog: MatDialog){}
  openDialog() {
    this.dialog.open(WrongdataComponent, {
      width:'500px'
    });
  }


}