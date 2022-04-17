import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wrongdata',
  template: `
  <div class="container w-75" style="color:black" >
  <div class="p-5 mb-4 bg-light rounded-3 justify-content-center align-items-centers">
  <div class="container-fluid py-5">
    <h1 class="display-5 fw-bold">Te contactaremos</h1>
    <p class="col-md-8 fs-5">
      Un ejecutivo se pondrá en contacto para verificar la información modificada. Enviaremos un correo con los datos de esta
      solicitud y los pasos a seguir.
    </p>
    <button class="btn btn-primary btn-md" type="button">Cerrar</button>
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
