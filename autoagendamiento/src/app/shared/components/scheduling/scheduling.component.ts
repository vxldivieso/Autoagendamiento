import { Component, OnInit } from '@angular/core';

import { SchedulingService } from './service/scheduling.service';

@Component({
  selector: 'scheduling',
  templateUrl: './scheduling.component.html' ,
  styleUrls: ['./scheduling.component.scss']
})
export class SchedulingComponent implements OnInit{
  public SchedulingData: any = null;
  constructor(private schedulingDataService: SchedulingService){

    }

  ngOnInit(): void {
    this.schedulingDataService.getScheduling().subscribe(data => this.SchedulingData = data)
  }



}
