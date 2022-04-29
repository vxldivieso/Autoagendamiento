import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientDataModel } from './client-data.model';
import { ClientDataService } from './service/clientData.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'client-data',
  templateUrl: './client-data.component.html',
  styleUrls: ['./client-data.component.scss']
})
export class ClientDataComponent implements OnInit {
  clientForm !: FormGroup;
  clientModelObj: ClientDataModel = new ClientDataModel();
  showUpdate !: boolean;
  clientData:any;
  message:boolean =false;
  constructor( private formBuilder: FormBuilder,
    private api: ClientDataService ) { }

  ngOnInit(): void {
    this.clientForm = this.formBuilder.group({
      name: [''],
      lastname: [''],
      rut: [''],
      email: [''],
      phone: ['',[Validators.minLength(9), Validators.maxLength(9)]],
      phone2: ['', [Validators.minLength(9), Validators.maxLength(9)]],
      direccion: [''],
      comuna: [''],
      city: [''],
    })
    this.getClient();
    
  }

  getClient(){
    this.api.getClient()
    .subscribe(res=>{
      this.clientData = res;
    }
    )
  }
  onEdit(row:any){
    this.showUpdate = true;
    this.clientModelObj.id = row.id;
    this.clientForm.controls['name'].setValue(row.name);
    this.clientForm.controls['lastname'].setValue(row.lastname);
    this.clientForm.controls['rut'].setValue(row.rut);
    this.clientForm.controls['email'].setValue(row.email);
    this.clientForm.controls['phone'].setValue(row.phone);
    this.clientForm.controls['phone2'].setValue(row.phone2);
    this.clientForm.controls['direccion'].setValue(row.direccion);
    this.clientForm.controls['comuna'].setValue(row.comuna);
    this.clientForm.controls['city'].setValue(row.city); 
  }


  updateClientDetails(){
    
    this.clientModelObj.name = this.clientForm.value.name;
    this.clientModelObj.lastname = this.clientForm.value.lastname;
    this.clientModelObj.rut = this.clientForm.value.rut;
    this.clientModelObj.email = this.clientForm.value.email;
    this.clientModelObj.phone = this.clientForm.value.phone;
    this.clientModelObj.phone2 = this.clientForm.value.phone2;
    this.clientModelObj.direccion = this.clientForm.value.direccion;
    this.clientModelObj.comuna = this.clientForm.value.comuna;
    this.clientModelObj.city = this.clientForm.value.city;

    this.api.putClient(this.clientModelObj, this.clientModelObj.id).subscribe({
      next:(res)=>{
        this.messageSuccessfull();
      },
      error: () =>{
        this.messageError();
      }
    }
    )

  }

  //Message Successfull
  messageSuccessfull(){
    Swal.fire({
      icon: 'success',
      title: 'Modificación enviada correctamente, por favor presione botón "Siguiente"',
      showConfirmButton: true,
      backdrop: true
    })
  }
  //Message Error
  messageError(){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No pudimos enviar la modificación',
      backdrop: true
    })
  }


}
