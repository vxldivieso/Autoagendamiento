import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SchedulingService } from './service/scheduling.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'scheduling',
  templateUrl: './scheduling.component.html' ,
  styleUrls: ['./scheduling.component.scss']
})
export class SchedulingComponent implements OnInit{
  public SchedulingData: any = null;

    constructor(private schedulingDataService: SchedulingService) {}
    ngOnInit(): void {
      
    }




}
