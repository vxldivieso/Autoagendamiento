import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SchedulingService } from './service/scheduling.service';
import { Observable } from 'rxjs';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
   selector: 'scheduling',
  templateUrl: './scheduling.component.html' ,
  styleUrls: ['./scheduling.component.scss'],
  
})
export class SchedulingComponent implements OnInit{
  displayedColumns : string[] = ['date','bloques']
  dataSource!: MatTableDataSource<any>;
  objectkeys = (item:any) => {return Object.keys(item).filter(key=> {return key != "date"})};

  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private api: SchedulingService) {}

  ngOnInit(): void {
    this.getCalendario()
  }

  getCalendario(){
    this.api.getScheduling()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }








}
