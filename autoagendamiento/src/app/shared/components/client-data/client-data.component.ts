import { AfterViewInit, Component, isDevMode, OnInit, ViewChild} from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router'; 
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetailOrderService, ModifyProductService } from 'src/app/service/detail.service';
import  {trigger, style, transition, animate,state, keyframes } from '@angular/animations';
import { CdkStepper } from '@angular/cdk/stepper';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { RouteService } from 'src/app/service/route.service';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/service/task.service';
import { EditProductComponent, EditServiceComponent } from '../detailOrder/detailOrder.component';
 
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
export class ClientDataComponent implements OnInit{
  //form control stepper
  form !: FormGroup;
  //form builder html 
  clientForm !: FormGroup;
  //variable que recibe los datos
  clientData:any;
  order_visit_status : any;
  data: string = '';

  order!: string;
  token!: string;

  orderParam!: any;
  tokenParam!: any;
  
  pathParam !: Observable<string | null>
  pathParamToken !: Observable<string | null>
  requests : any;
  requestsLog:any;

  //task var
  status: string = 'pending';
  kindTask : any;
  detailsTask : any;
  taskOrder : any;

  
  private destroy = new Subject<void>();

  constructor( private formBuilder: FormBuilder,
    private api: DetailOrderService, private ctrlContainer: FormGroupDirective,
    private route : ActivatedRoute, private cdk : CdkStepper,  
    private service : RouteService,  private apiMod: ModifyProductService,
    private router : Router, private task : TaskService) {
      this.order = this.route.snapshot.params['order'];
      this.token = this.route.snapshot.params['token'];
     }

  ngOnInit(): void {
    this.clientForm = this.formBuilder.group({
      name: [''],
      rut: [''],
      email: [''], 
      phone: ['',[Validators.minLength(9), Validators.maxLength(9)]],
      phone2: ['', Validators.compose([Validators.minLength(9), Validators.maxLength(9)])],
      address: [''],
      county: [''],
      references: ['', Validators.required]
    });
    this.form = this.ctrlContainer.form;
    this.form.addControl("clientData", this.clientForm);
    this.getClientData();
    this.getTask()
    
    //route order
    this.route.paramMap
    .pipe(
      map(paramMap => paramMap.get('order')),
      takeUntil(this.destroy)
    )
    .subscribe(order => this.service.updatePathParamState(order));
    //route token
    this.route.paramMap
    .pipe(
      map(paramMap => paramMap.get('token')),
      takeUntil(this.destroy)
    )
    .subscribe(token => this.service.updatePathParamStateToken(token));
  }

  

  getClientData(){
    if (isDevMode()) {
      this.api.getOrderDEV(this.order,this.token)
      .subscribe((res:any)=>{
        this.clientData = res.contact;
        this.order_visit_status = res.order_visit_status;
        
      })
    }
    else
      this.api.getOrderId(this.order,this.token)
      .subscribe((res:any)=>{
        this.clientData = res.contact;
        this.order_visit_status = res.order_visit_status;
      })
  }

  getTask(){
    let task = '';
    let kind = '';
    let details = '';
    if (isDevMode()) {
      this.task.getTaskDEV(this.status, this.order, this.token).subscribe((res: any) =>{
        res.forEach(function(res: any) {
          task = res
          kind = res.kind
          details = res.details
        })
        this.taskOrder = task;
        this.kindTask = kind
        this.detailsTask = details
      })
    }
    else
    this.task.getTask(this.status, this.order, this.token).subscribe((res: any) =>{
      res.forEach(function(res: any) {
        task = res
        kind = res.kind
        details = res.details
      })
      this.taskOrder = task;
      this.kindTask = kind
      this.detailsTask = details
    })
  }

  updateClientContact(){
    this.clientForm.controls['phone2'].patchValue(this.clientData.phone2);
    this.clientForm.controls['references'].patchValue(this.clientData.references);

    if (isDevMode()) {
      if(this.clientForm.valid){
        Object.keys(this.clientForm.value).forEach(res =>{
          if (this.clientForm.value[res] == ''){
            delete this.clientForm.value[res]
          }
        })
        this.api.putContactDEV(this.clientForm.value, this.order, this.token)
        .subscribe({
          next:(res)=>{
            if(this.kindTask == 'need_correction'){
              this.messageSuccessfull();
              this.router.navigate([`${this.order}/${this.token}/contact/data`])
            }
            else
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
        Object.keys(this.clientForm.value).forEach(res =>{
          if (this.clientForm.value[res] == ''){
            delete this.clientForm.value[res]
          }
        })
        this.api.putContact(this.clientForm.value, this.order, this.token)
        .subscribe({
          next:(res)=>{
            if(this.kindTask == 'need_correction'){
              this.messageSuccessfull();
              this.router.navigate([`${this.order}/${this.token}/contact/data`])
            }
            else
            this.messageSuccessfull();
            this.cdk.next()
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
  order!: string;
  token!: string;
  requests : any;

  orderParam!: any;
  tokenParam!: any;
  
  pathParam !: Observable<string | null>
  pathParamToken !: Observable<string | null>

  //vars
  phone2!:string;
  direccion!:string;
  comuna!:string;
  referencias!:string;
  
  //vars task
  kind: string = 'need_correction'
  details: string = 'Necesita corrección de datos'

  //task var
  status: string = 'pending';
  kindTask : any;
  detailsTask : any;
  taskOrder : any;

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, private api : ModifyProductService,
    private router : Router, private service : RouteService, private task:TaskService) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      phone2: [''],
      direccion: [''],
      comuna: [''],
      referencias: [''],
    })

    //params nonroute
    this.pathParam = this.service.pathParam;
    this.pathParam.subscribe(res=>{
      this.orderParam = res
    })

    this.pathParamToken = this.service.pathParamToken;
    this.pathParamToken.subscribe(res=>{
      this.tokenParam = res
      
    })
    this.getRequestId()
    this.getTask()
  }

  getRequestId(){
    if (isDevMode()) {
      this.api.getRequestDEV(this.orderParam, this.tokenParam).subscribe((resp:any)=>{
        this.requests = resp.request_id;
      })
    }
    else
      this.api.getRequest(this.orderParam, this.tokenParam).subscribe((resp:any)=>{
        this.requests = resp.request_id;
      })
  }
  
  getTask(){
    let task = '';
    let kind = '';
    let details = '';
    if (isDevMode()) {
      this.task.getTaskDEV(this.status, this.orderParam, this.tokenParam).subscribe((res: any) =>{
        res.forEach(function(res: any) {
          task = res
          kind = res.kind
          details = res.details
        })
        this.taskOrder = task;
        this.kindTask = kind
        this.detailsTask = details
      })
    }
    else
    this.task.getTask(this.status, this.orderParam, this.tokenParam).subscribe((res: any) =>{
      res.forEach(function(res: any) {
        task = res
        kind = res.kind
        details = res.details
      })
      this.taskOrder = task;
      this.kindTask = kind
      this.detailsTask = details
    })
  }

  postTaskDEV(){
    this.task.postTaskDEV(this.kind, this.details, this.orderParam, this.tokenParam).subscribe({
      next:(res)=>{
          res
      }
    })
  }
  postTask(){
    this.task.postTask(this.kind, this.details, this.orderParam, this.tokenParam).subscribe({
      next:(res)=>{
          res
      }
    })
  }


  onSubmit(){
    this.phone2 = this.form.controls['phone2'].value
    this.direccion = this.form.controls['direccion'].value
    this.comuna = this.form.controls['comuna'].value
    this.referencias = this.form.controls['referencias'].value
    
    if (isDevMode()) {
      if(this.form.valid){
        let message :string = "Datos Contacto (Modificados): \n";
        if (this.phone2 != null ){
          message += `Telefono 2: ${this.phone2} \n`
        }
        if (this.direccion != null ){
          message += `Dirección: ${this.direccion} \n`
        }
        if (this.comuna != null){
          message += `Comuna: ${this.comuna} \n`
        }
        if (this.referencias != null ){
          message += `Referencias: ${this.referencias} \n`
        }
        if (this.kindTask != 'need_correction' && this.detailsTask != 'Necesita corrección de datos'){
          this.postTask();
          this.api.putRequestDEV(message, this.requests, this.tokenParam)
              .subscribe({
                next:(res)=>{
                  res
                  this.dialog.closeAll();
                  this.messageSuccessfull();
                  this.router.navigate([`${this.orderParam}/${this.tokenParam}/contact/data`])
                },
                error: () =>{
                  this.messageError();
                }
              }) 
        }
        else
        this.api.putRequestDEV(message, this.requests, this.tokenParam)
              .subscribe({
                next:(res)=>{
                  res
                  this.dialog.closeAll();
                  this.messageSuccessfull();
                  this.router.navigate([`${this.orderParam}/${this.tokenParam}/contact/data`])
                },
                error: () =>{
                  this.messageError();
                }
              }) 
      }
    }
    else
    if(this.form.valid){
      let message :string = "Datos Contacto (Modificados): \n";
        if (this.phone2 != null ){
          message += `Telefono 2: ${this.phone2} \n`
        }
        if (this.direccion != null ){
          message += `Dirección: ${this.direccion} \n`
        }
        if (this.comuna != null){
          message += `Comuna: ${this.comuna} \n`
        }
        if (this.referencias != null ){
          message += `Referencias: ${this.referencias} \n`
        }
        if (this.kindTask != 'need_correction' && this.detailsTask != 'Necesita corrección de datos'){
          this.postTask();
          this.api.putRequest(message, this.requests, this.tokenParam)
              .subscribe({
                next:(res)=>{
                  res
                  this.dialog.closeAll();
                  this.messageSuccessfull();
                  this.router.navigate([`${this.orderParam}/${this.tokenParam}/contact/data`])
                },
                error: () =>{
                  this.messageError();
                }
              }) 
        }
        else
        this.api.putRequest(message, this.requests, this.tokenParam)
              .subscribe({
                next:(res)=>{
                  res
                  this.dialog.closeAll();
                  this.messageSuccessfull();
                  this.router.navigate([`${this.orderParam}/${this.tokenParam}/contact/data`])
                },
                error: () =>{
                  this.messageError();
                }
              }) 
        
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
  selector: 'button-wrongdata',
  template: `
  <div class="d-grid d-md-flex justify-content-md-center">
    <button mat-raised-button color="accent" (click)="openDialog()">Datos Incorrectos</button>
  </div>`,
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