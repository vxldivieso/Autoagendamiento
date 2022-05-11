import { AfterViewInit, Component, Directive, ElementRef, isDevMode, OnInit, Output, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { SchedulingService } from '../../../service/scheduling.service';
import { ReagendarService } from '../../../service/detail.service';
import { CdkStepper } from '@angular/cdk/stepper';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'scheduling',
  templateUrl: './scheduling.component.html' ,
  styleUrls: ['./scheduling.component.scss'],
  providers: [FormGroupDirective]
  
})

export class SchedulingComponent implements OnInit {
  //table
  displayedColumns : string[] = ['date','bloques']
  dataSource!: MatTableDataSource<any>;
  //variables bloque horario
  date !: string;
  bloque !: number;
  blockSelect !: boolean;
  scheduledCorrect !: boolean;
  //formControl
  form !: FormGroup;
  subForm!: FormGroup;
  //params
  order!: number;
  token!: string;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: SchedulingService, private cdk : CdkStepper, private route : ActivatedRoute) {
      this.order = this.route.snapshot.params['order'];
      this.token = this.route.snapshot.params['token'];
    }

  ngOnInit(): void {
    this.getApiSchedule()
  }
  

  //Obtener dates y bloques
  getApiSchedule(){
    if (isDevMode()) {
      this.api.getScheduleDEV(this.order, this.token).subscribe({
        next:(res)=>{
          const res2 = this.bloqueHorario(res)
          this.dataSource = new MatTableDataSource(res2);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      })
    }
    else
      this.api.getSchedule(this.order, this.token).subscribe({
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
        date:key, 
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
  select(date:string, bloque:number){
    this.date = date;
    this.bloque = bloque;
    if (this.date,this.bloque){
      this.blockSelect = true;
      return console.log(`bloque ${bloque} del día ${date}`);
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
              this.scheduledCorrect = true;
              console.log(res);
            },
            error: (res) =>{
              this.scheduledCorrect = false;
              this.messageError();
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
              this.scheduledCorrect = true;
              console.log(res);
            },
            error: (res) =>{
              this.scheduledCorrect = false;
              this.messageError();
            }
          }
        )
      }
  }
  //Message successfull
  messageSuccessfull(){
    if(this.blockSelect == true){
      Swal.fire({
        icon: 'info',
        title: 'Condiciones del servicio',
        html: 
        '<ol class="text-left">'+
        '<li>Cajas deben encontrarse selladas</li>'+
        '<li>Las cajas deben estar en el lugar exacto donde va a quedar producto armado para uso</li>'+
        '<li>Debe contar con el espacio suficiente para que técnico pueda manipular las piezas</li>'+
        '</ol>',
        showDenyButton: true,
        confirmButtonColor:'black',
        confirmButtonText: 'Agendar',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire(`Visita Seleccionada para el día`, 
          `${this.date}`, 'info').then((result) =>{
            if (result.isConfirmed){
              this.agendar()
              this.cdk.next;
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
      text: 'Por favor selecciona un bloque horario',
      showConfirmButton: true,
      confirmButtonColor:'black',
      backdrop: true
    })
  }


}


//Modal Reagendar
@Component({
 selector: 'agendar',
 templateUrl: './reagendar.component.html',
 styleUrls: ['./scheduling.component.scss'],
 
}) 
export class ReagendarComponent implements OnInit{
  minDate = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate())
  maxDate = new Date(2022, 11, 1); 
  reagendarForm !: FormGroup;
  constructor(private formBuilder: FormBuilder, private api: ReagendarService) {}

  ngOnInit(): void {
    this.reagendarForm = this.formBuilder.group({
      date: ['', Validators.required],
    })

  }
  onSubmit(){
    if(this.reagendarForm.valid){
      this.api.postReagendar(this.reagendarForm.value)
      .subscribe(
        {
          next:(res)=>{
            this.messageSuccessfull();
          },
          error: () =>{
            this.messageError();
          }
        }
      )
    }
    
  }

//Message successfull
messageSuccessfull(){
  Swal.fire({
    icon: 'success',
    title: 'Proceso guardado correctamente',
    text: 'Recuerda que este link expirará, se te enviará uno nuevo para completar el agendamiento',
    showConfirmButton: true,
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

@Component({
  selector: 'button-reagendar',
  template: `
  <button mat-raised-button color="accent" (click)="openDialog()">Deseo agendar en otro momento</button>
  
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
}


