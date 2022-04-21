import { Component, } from '@angular/core';
import { tap } from 'rxjs';
import { ClientDataService } from '../client-data/service/clientData.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  

  constructor(private clientDataSvc: ClientDataService ) { }

  ngOnInit(): void {
    
  }
 
}
