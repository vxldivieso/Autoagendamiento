import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wrongdata',
  template: `
  <div class="px-4 py-5 my-5 text-center">
    <h1 class="display-5 fw-bold">Te contactaremos</h1>
    <div class="col-lg-6 mx-auto">
      <h3 class="mb-4">Dentro de las próximas horas hábiles, un ejecutivo se pondrá en contacto para verificar la información
        modificada y continuar con el agendamiento del servicio.
      </h3>
      <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <button mat-raised-button color="primary" class="btn-lg px-4 gap-3">Cerrar</button>
      </div>
    </div>
  </div>
  `,
  styleUrls: ['./wrongdata.component.scss']
})
export class WrongdataComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
