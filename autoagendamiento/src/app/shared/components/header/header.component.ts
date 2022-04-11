import { Component, } from '@angular/core';
import { tap } from 'rxjs';
import { ClientData } from 'src/app/pages/stepper/interfaces/clientData.interface';
import { ClientDataService } from 'src/app/pages/stepper/service/clientData.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  clients!: ClientData[];

  constructor(private clientDataSvc: ClientDataService ) { }

  ngOnInit(): void {
    this.clientDataSvc.getClientData()
    .pipe(
      tap((clients: ClientData[]) => this.clients = clients)
    )
    .subscribe();
  }
 
}
