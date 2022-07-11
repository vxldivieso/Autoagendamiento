import { AfterViewInit, Component, isDevMode, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { SchedulingService } from '../../../service/scheduling.service';
import { DateService, DetailOrderService, ModifyProductService } from '../../../service/detail.service';
import { CdkStepper } from '@angular/cdk/stepper';
import { ActivatedRoute } from '@angular/router';
import  {trigger, style, transition, animate,state } from '@angular/animations';
import { RouterModule, Routes, Router } from '@angular/router';
import * as moment from 'moment';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { RouteService } from 'src/app/service/route.service';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { TaskService } from 'src/app/service/task.service';
import { NGXLogger } from 'ngx-logger';


@Component({
  selector: 'scheduling',
  templateUrl: './scheduling.component.html' ,
  styleUrls: ['./scheduling.component.scss'],
  providers: [FormGroupDirective,
    { provide: Window, useValue: window }
  ],
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
  ]
  
})

export class SchedulingComponent implements OnInit, OnDestroy, AfterViewInit {
  //table
  displayedColumns : string[] = ['date','bloques']
  dataSource!: MatTableDataSource<any>;
  //variables bloque horario
  date = new Date();
  bloque !: number;
  blockSelect !: boolean;
  scheduledCorrect !: boolean;
  //formControl
  form !: FormGroup;
  subForm!: FormGroup;
  //params
  order!: any;
  token!: string;

  //vars
  dates = (value:string) => {return moment(value).format('dddd, DD/MMMM/YYYY')}

  delivery_date:any;
  datedelivery : any;
  fechaFrom : any;
  fechaTo: any;
  scheduledFrom:any;
  scheduledTo:any;
  dateToday = new Date() ;

  dateForSelect = new Date();

  private destroy = new Subject<void>();

  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private api: SchedulingService, private apiDate : DateService, private cdk : CdkStepper, 
    private route : ActivatedRoute,
    private ctrlContainer: FormGroupDirective,  private service : RouteService, date: DateAdapter<Date>, 
    private window : Window,
    private logger: NGXLogger) {
      this.order = this.route.snapshot.params['order'];
      this.token = this.route.snapshot.params['token'];
      moment.locale('es');
    }

    
  ngOnInit(): void {
    this.form = this.ctrlContainer.form;
    this.getDeliveryDate()
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

  ngOnDestroy(): void {
    this.destroy.next()
    this.destroy.complete()
    this.service.updatePathParamState(null);
    this.service.updatePathParamStateToken(null);
  }

  ngAfterViewInit(): void {
    this.window.scrollTo(0, 0);
  }

  log(lvl:any){
    switch(lvl){
      case 0:
        this.logger.info('Vista 3: Completada exitosamente')
        break;
      case 1:
        this.logger.error('Cliente no pudo agendar')
        break;
    }
  }

  scrollTop(){
    this.window.scrollTo(0, 0);
  }

  getDeliveryDate(){
    
    if (isDevMode()) {
      this.apiDate.getOrderIdDEV(this.order, this.token)
      .subscribe((res:any)=>{
        this.delivery_date = res.delivery_date;
        
        if(this.delivery_date != null){
          //fecha from
          this.fechaFrom = moment(this.delivery_date).add(2,'days')
          this.scheduledFrom = moment(this.fechaFrom._d).format('YYYY-MM-DD')
          
          //fecha to
          this.fechaTo = moment(this.delivery_date).add(31,'days')
          this.scheduledTo = moment(this.fechaTo._d).format('YYYY-MM-DD')

          //method get schedule
          this.getApiSchedule()

          return this.scheduledTo, this.scheduledFrom
        }
        else
        //fecha from
        this.fechaFrom = moment(this.dateToday).add(2,'days')
        this.scheduledFrom = moment(this.fechaFrom._d).format('YYYY-MM-DD')
        
        //fecha to
        this.fechaTo = moment(this.dateToday).add(31,'days')
        this.scheduledTo = moment(this.fechaTo._d).format('YYYY-MM-DD')

        //method get schedule
        this.getApiSchedule()
        
        return this.scheduledTo, this.scheduledFrom

        
      })
    }
    else
    this.apiDate.getOrderId(this.order, this.token)
    .subscribe((res:any)=>{
      this.delivery_date = res.delivery_date;
      if(this.delivery_date != null){
        //fecha from
        this.fechaFrom = moment(this.delivery_date).add(2,'days')
        this.scheduledFrom = moment(this.fechaFrom._d).format('YYYY-MM-DD')
        
        //fecha to
        this.fechaTo = moment(this.delivery_date).add(31,'days')
        this.scheduledTo = moment(this.fechaTo._d).format('YYYY-MM-DD')

        //method get schedule
        this.getApiSchedule()

        return this.scheduledTo, this.scheduledFrom
      }
      else
      //fecha from
      this.fechaFrom = moment(this.dateToday).add(2,'days')
      this.scheduledFrom = moment(this.fechaFrom._d).format('YYYY-MM-DD')
      
      //fecha to
      this.fechaTo = moment(this.dateToday).add(31,'days')
      this.scheduledTo = moment(this.fechaTo._d).format('YYYY-MM-DD')

      //method get schedule
      this.getApiSchedule()
      
      return this.scheduledTo, this.scheduledFrom
    })

  }

   
  //Obtener dates y bloques
  getApiSchedule(){
    if (isDevMode()) {
      
      this.api.getScheduleDEV(this.scheduledFrom, this.scheduledTo, this.order, this.token).subscribe({
        next:(res)=>{
          const res2 = this.bloqueHorario(res)
          console.log();
          this.dataSource = new MatTableDataSource(res2);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      })
    }
    else
      this.api.getSchedule(this.scheduledFrom, this.scheduledTo,this.order, this.token).subscribe({
        next:(res)=>{
          const res2 = this.bloqueHorario(res)
          this.dataSource = new MatTableDataSource(res2);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      })
  }


  //Transform json
  bloqueHorario(item:any){
    const transformJson = Object.keys(item).map(key => {
      const blocks = Object.keys(item[key]).map(key=>parseInt(key));
      return {
        date: key,
        morning: blocks.reduce((prev: boolean | number, next)=>{
          return prev == false && next < 3? next:prev}
        ,false), 
        afternoon: blocks.reduce((prev: boolean | number, next)=>{
          return prev == false && next >= 3? next:prev}
        ,false)
      };
    })
    return transformJson;
  }

  //Select bloque
  select(date:any, bloque:number){
    this.date = date;
    this.bloque = bloque;
    if (this.date,this.bloque){
      this.blockSelect = true;
    }
    else
      this.blockSelect = false;
  }
  
  //Agendar
  agendar(){
    if (isDevMode()) {
      if(this.blockSelect == true ){
        this.api.putScheduleDEV(this.date,this.bloque, this.order, this.token).subscribe(
          {
            next:(res)=>{
              this.cdk.next()
              this.log(0);
            },
            error: (res) =>{
              this.messageError();
              this.log(1)
            }
          }
        )
      }
    }
    else
      if(this.blockSelect == true ){
        this.api.putSchedule(this.date,this.bloque, this.order, this.token).subscribe(
          {
            next:(res)=>{
              this.cdk.next()
              this.log(0);
            },
            error: (res) =>{
              this.messageError();
              this.log(1)
            }
          }
        )
      }
  }
  //Message successfull
  messageSuccessfull(){
    const myFormat= 'dddd, DD-MM-YYYY'
    let block = [1,2].includes(this.bloque)? "09:00 am - 13:00 pm" : "13:00 pm - 19:00 pm"

    if(this.blockSelect == true){
      Swal.fire({
        icon: 'info',
        title: 'Visita seleccionada: ',
        html: `<div><ol><li><span style = "font-weight: bold;">Día: </span> ${moment(this.date).format(myFormat)}</li> <br> <li><span style = "font-weight: bold;">Horario: </span> ${block}</li></ol></div>` ,
        showDenyButton: true,
        denyButtonText: `Cancelar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire({
            icon: 'info',
            title: 'Condiciones del servicio',
            html: '<div class="container w-75" style="text-align: left"><ol><li>Debe encontrarse una persona mayor de 18 años en el domicilio al momento de ejecutarse el servicio.</li><li>Cajas deben encontrarse selladas.</li> <li>Las cajas deben estar en el lugar exacto donde va a quedar producto armado para uso.</li> <li>Debe contar con el espacio suficiente para que técnico pueda manipular las piezas.</li></ol></div>',
            showDenyButton: true,
            confirmButtonText: 'Agendar',
            denyButtonText: `Cancelar`,
          }).then((result) =>{
            if (result.isConfirmed){
              this.agendar();
            }
          });
        }
      })
    }
    else
    this.messageErrorSelect();
    
  }
  
  //Message Error
  messageError(){
    Swal.fire({
      icon: 'error',
      title: 'Oops... Algo ocurrió',
      text: 'No pudimos completar el proceso',
      showConfirmButton: true,
      backdrop: true
    })
  }
  //Error select
  messageErrorSelect(){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Por favor seleccione un bloque horario',
      showConfirmButton: true,
      backdrop: true
    })
  }


}

//Modal disponibilidad
@Component({
  selector: 'disponibilidad',
  templateUrl: './disponibilidad.component.html',
  styleUrls: ['./modal.component.scss'],
  
 })

export class NoDisponibilityComponent implements OnInit{
  //params
  order!: any;
  token!: any;
  
  pathParam !: Observable<string | null>
  pathParamToken !: Observable<string | null>

  kind: string = 'contact_support'
  details: string = 'No encuentra disponibilidad'
  
  constructor(private logger: NGXLogger, private dialog: MatDialog, private router : Router, private service : RouteService, private task:TaskService){}
  ngOnInit(): void {
    this.pathParam = this.service.pathParam;
    this.pathParam.subscribe(res=>{
      this.order = res
    })

    this.pathParamToken = this.service.pathParamToken;
    this.pathParamToken.subscribe(res=>{
      this.token = res
      
    })
  }

  log(lvl:any){
    switch(lvl){
      case 0:
        this.logger.info('Vista 3: Cliente no encontró disponibilidad')
        break;
    }
  }

  onSubmit(){
    if (isDevMode()) {
      this.task.postTaskDEV(this.kind, this.details, this.order, this.token).subscribe({
        next:(res)=>{
           res
        }
      })
      
    }
    else
    this.task.postTask(this.kind, this.details, this.order, this.token).subscribe({
      next:(res)=>{
         res
      }
    })
    this.dialog.closeAll()
    this.router.navigate([`${this.order}/${this.token}/contact/ejecutivo`])
    this.log(0);
  }

}

@Component({
  selector: 'button-noDisponibility',
  template: `
  <div class="d-grid d-md-flex justify-content-md-center">
    <button mat-raised-button color="accent" (click)="openDialog()">No encuentro disponibilidad</button>
  </div>
  `,
  styleUrls: ['./scheduling.component.scss'],
})
export class NoDisponibilityDialog{
  constructor(private dialog: MatDialog){
  }
  openDialog() {
    this.dialog.open(NoDisponibilityComponent, {width:'400px'});
  }
  closeDialog(){
    this.dialog.closeAll();
  }
}

//Modal Ejecutivo
@Component({
  selector: 'contactoejecutivo',
  templateUrl: './contacto.component.html',
  styleUrls: ['./modal.component.scss'],
  
 })

export class ContactComponent implements OnInit{
  //params
  order!: any;
  token!: any;

  kind: string = 'contact_support'
  details: string = 'Necesita contactarse con un ejecutivo.'

  pathParam !: Observable<string | null>
  pathParamToken !: Observable<string | null>
  constructor(private logger: NGXLogger, private dialog: MatDialog, private router : Router, private service : RouteService, private task:TaskService){
    }
  ngOnInit(): void {
    this.pathParam = this.service.pathParam;
    this.pathParam.subscribe(res=>{
      this.order = res
    })

    this.pathParamToken = this.service.pathParamToken;
    this.pathParamToken.subscribe(res=>{
      this.token = res
      
    })
  }
  log(lvl:any){
    switch(lvl){
      case 0:
        this.logger.info('Vista 3: Contacto ejecutivo')
        break;
    }
  }

  onSubmit(){
    if (isDevMode()) {
      this.task.postTaskDEV(this.kind, this.details, this.order, this.token).subscribe({
        next:(res)=>{
           res
        }
      })
      
    }
    else
    this.task.postTask(this.kind, this.details, this.order, this.token).subscribe({
      next:(res)=>{
         res
      }
    })
    this.dialog.closeAll()
    this.router.navigate([`${this.order}/${this.token}/contact/ejecutivo`])
    this.log(0)
  }

}

@Component({
  selector: 'button-contact',
  template: `
  <div class="d-grid d-md-flex justify-content-md-center">
    <button mat-raised-button color="accent" (click)="openDialog()">Necesito contactar a un ejecutivo</button>
  </div>
  `,
  styleUrls: ['./scheduling.component.scss'],
})
export class ContactDialog{
  constructor(private dialog: MatDialog ){}
  openDialog() {
    this.dialog.open(ContactComponent, {
      width:'400px'
    });
  }
  closeDialog(){
    this.dialog.closeAll();
  }
}



//Modal Reagendar
@Component({
 selector: 'agendar',
 templateUrl: './reagendar.component.html',
 styleUrls: ['./modal.component.scss'],
 providers: [DatePipe,{ provide: MAT_DATE_LOCALE, useValue: 'es' }],
 
}) 
export class ReagendarComponent implements OnInit{
  minDate = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()+1)
  maxDate = new Date(2022, 11, 31); 
  reagendarForm !: FormGroup;
  //params
  order!: any;
  token!: any;

  pathParam !: Observable<string | null>
  pathParamToken !: Observable<string | null>

  dateReagendar = new Date() ;
  date : any;

  requests : any;

  constructor(private formBuilder: FormBuilder, private api : SchedulingService, 
    private router : Router, private logger: NGXLogger, private dialog: MatDialog, private service: RouteService, 
    date: DateAdapter<Date>, private task : TaskService, private apiMod : ModifyProductService) {
      date.getFirstDayOfWeek = () => 1;
      date.setLocale('es');

    }

  ngOnInit(): void {
    this.reagendarForm = this.formBuilder.group({
      date: ['', Validators.required],
    })

    this.pathParam = this.service.pathParam;
    this.pathParam.subscribe(res=>{
      this.order = res
    })

    this.pathParamToken = this.service.pathParamToken;
    this.pathParamToken.subscribe(res=>{
      this.token = res
      
    })

    this.getRequestId();
    
  }

  log(lvl:any){
    switch(lvl){
      case 0:
        this.logger.info('Vista 3: Cliente pidió reagendar')
        break;
    }
  }

  getRequestId(){
    if (isDevMode()) {
      this.apiMod.getRequestDEV(this.order, this.token).subscribe((resp:any)=>{
        this.requests = resp.request_id;
      })
    }
    else
      this.apiMod.getRequest(this.order, this.token).subscribe((resp:any)=>{
        this.requests = resp.request_id;
      })
  }



  transformDate(){
    const myFormat= 'YYYY-MM-DD'
    let obj = this.reagendarForm.value
    this.date = moment(obj.date).format(myFormat);
    return this.date
  }

  onSubmit(){
    this.transformDate();
    
    let message: string = `Fecha de contacto futuro: ${this.date}`;
    if(this.reagendarForm.valid){
      if (isDevMode()) {
        this.api.postDelayDEV(this.date, this.order, this.token)
        .subscribe(
          {
            next:(res)=>{
              this.dialog.closeAll()
              this.messageSuccessfull()
              this.apiMod.putRequestDEV(message, this.requests, this.token)
              .subscribe((resp:any)=>{
                resp;
                this.log(0)
              })
            },
            error: () =>{
              this.messageError();
            }
        }
      )}
      else
      this.api.postDelay(this.date, this.order, this.token)
      .subscribe({
          next:(res)=>{
            this.dialog.closeAll()
            this.messageSuccessfull()
            this.apiMod.putRequest(message, this.requests, this.token)
              .subscribe((resp:any)=>{
                resp;
                this.log(0)
              })
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
    title: 'Proceso guardado correctamente',
    showConfirmButton: true,
    backdrop: true,
    allowOutsideClick: false,
  }).then((result) =>{
    if (result.isConfirmed){
      this.router.navigate([`${this.order}/${this.token}/contact/save`])
    }
  });
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

@Component({
  selector: 'button-reagendar',
  template: `
  <div class="d-grid d-md-flex justify-content-md-center">
    <button mat-raised-button color="accent" (click)="openDialog()">Deseo agendar en otro momento</button>
  </div>
  `,
  styleUrls: ['./scheduling.component.scss'],
})
export class ReagendarDialog{
  constructor(private dialog: MatDialog ){}
  openDialog() {
    this.dialog.open(ReagendarComponent, {
      width:'400px'
    });
  }
  closeDialog(){
    this.dialog.closeAll();
  }
}


