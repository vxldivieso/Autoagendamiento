import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2'
import { SchedulingComponent } from '../scheduling/scheduling.component';
import { Agendamiento, SchedulingService } from '../scheduling/service/scheduling.service';

@Component({
  selector: 'app-end-process',
  templateUrl: './end-process.component.html',
  styleUrls: ['./end-process.component.scss']
})
export class EndProcessComponent implements OnInit{
  savedDate: Agendamiento[] = []
  constructor(private api: SchedulingService) { }
  ngOnInit(): void {
    this.getSavedDate()
  }

  getSavedDate(){
    this.api.getSavedDate().subscribe(
      res=>{
        this.savedDate = res.json();
        console.log(res)
      })
  }
  

  

}
