import { Component, OnInit, ViewChild, AfterViewInit, Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SchedulingService } from './service/scheduling.service';
import { Observable } from 'rxjs';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ReagendarService } from '../detailOrder/service/detail.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/pages/stepper/stepper.component';

@Component({
  selector: 'scheduling',
  templateUrl: './scheduling.component.html' ,
  styleUrls: ['./scheduling.component.scss'],
  
})

export class SchedulingComponent implements OnInit{
  displayedColumns : string[] = ['date','bloques']
  dataSource!: MatTableDataSource<any>;

  date!: string;
  bloque!: number;

  isSelect = false;

  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private dialog: MatDialog, private api: SchedulingService) {}

  ngOnInit(): void {
    this.getCalendario()
  }


  //Obtener dates y bloques
  getCalendario(){
    this.api.getScheduling()
    .subscribe({
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
    console.log(`bloque ${bloque} del dia ${date} `)
    return true;
  }
  
  isSelectOrNo(value: boolean): void{
    this.isSelect = value;
  }

  //Agendar
  agendar(){
      this.api.postAgendamiento(this.date,this.bloque).subscribe(
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

  //Message successfull
  messageSuccessfull(){
    Swal.fire({
      icon: 'success',
      title: 'Visita agendada correctamente',
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

  //Dialog modal condiciones
  openDialog() {
    console.log(`Bloque seleccionado: ${this.bloque} en el día ${this.date} `);
    this.dialog.open(DialogDataExampleDialog,
      {width:'500px'}
      );
  }
}


//Dialog - Modal condiciones del servicio
@Component({
  selector: 'dialog-data-example-dialog',
  template:`<h1 mat-dialog-title class="text-center">Condiciones del Servicio</h1>
  <div mat-dialog-content >
  <p>Cajas deben encontrarse selladas</p>
  <p>Las cajas deben estar en el lugar exacto donde va a quedar producto armado para uso</p>
  <p>Debe contar con el espacio suficiente para que técnico pueda manipular las piezas</p>
  </div>
  <div mat-dialog-actions [align]="'center'" >
  <button mat-raised-button mat-dialog-close>Cerrar</button>
  <button mat-raised-button color="primary">OK</button>
</div>`,
  styleUrls: ['./scheduling.component.scss'],
})
export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
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
  <button mat-raised-button color="warn" (click)="openDialog()">Deseo agendar en otro momento</button>
  
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


