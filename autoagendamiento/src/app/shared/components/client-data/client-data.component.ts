import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { ClientData } from 'src/app/pages/stepper/interfaces/clientData.interface';
import { ClientDataService } from 'src/app/pages/stepper/service/clientData.service';

@Component({
  selector: 'client-data',
  templateUrl: './client-data.component.html',
  styleUrls: ['./client-data.component.scss']
})
export class ClientDataComponent implements OnInit {
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
