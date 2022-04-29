import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReagendarService } from 'src/app/shared/components/detailOrder/service/detail.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-wrongdata',
  template: `
  <div class="px-4 py-5 my-5 text-center">

      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="none" 
      viewBox="0 0 25 24">
      <style>@keyframes n-info{0%,to{transform:rotate(0deg);transform-origin:center}10%,90%{transform:rotate(2deg)}20%,40%,60%{transform:rotate(-6deg)}30%,50%,70%{transform:rotate(6deg)}80%{transform:rotate(-2deg)}}</style><circle cx="12.29" cy="12" r="8" 
      stroke="#0A0A30" stroke-width="1.5"/><path fill="#00e5ff" d="M12.924 15.106h.713c.113 0 .17.057.17.17v.554c0 
      .113-.057.17-.17.17h-2.693c-.113 0-.17-.057-.17-.17v-.554c0-.113.057-.17.17-.17h.713v-3.78h-.611c-.113 0-.17-.056-.17-.169v-.588c0-.114.057-.17.17-.17h1.709c.113 0 .17.056.17.17v4.537zm-1.369-5.714a.804.804 0 01-.215-.577c0-.234.072-.427.215-.577A.776.776 0 0112.143 8c.25 0 .445.08.589.238.15.15.226.343.226.577a.782.782 0 01-.226.577c-.151.15-.35.226-.6.226-.241 0-.434-.075-.577-.226z" style="animation:n-info .8s cubic-bezier(.455,.03,.515,.955) "/></svg>
        
  <h1 class="display-5 fw-bold">Te contactaremos</h1>
    <div class="col-lg-6 mx-auto">
      <h3 class="mb-4">Dentro de las próximas horas hábiles, un ejecutivo se pondrá en contacto para continuar con el agendamiento del servicio.
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
