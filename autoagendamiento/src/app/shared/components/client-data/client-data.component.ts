import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { tap } from 'rxjs';
import { ClientDataModel } from './client-data.model';
import { ClientDataService } from './service/clientData.service';

@Component({
  selector: 'client-data',
  templateUrl: './client-data.component.html',
  styleUrls: ['./client-data.component.scss']
})
export class ClientDataComponent implements OnInit {
  clientForm !: FormGroup;
  clientModelObj: ClientDataModel = new ClientDataModel();

  clientData:any;
  constructor( private formBuilder: FormBuilder,
    private api: ClientDataService ) { }

  ngOnInit(): void {
    this.clientForm = this.formBuilder.group({
      id: [''],
      name: [''],
      lastname: [''],
      rut: [''],
      email: [''],
      phone: [''],
      phone2: [''],
      direccion: [''],
      comuna: [''],
      city: [''],
    })
    this.getClient();
    
  }
  
  addClient(){
    if(this.clientForm.valid){
      this.api.postClient(this.clientForm.value)
      .subscribe({
        next:(res)=>{
          alert("Cliente añadido correctamente")
        },
        error:()=>{
          alert("Error al añadir cliente")
        }
      })
    }
  }

  getClient(){
    this.api.getClient()
    .subscribe(res=>{
      this.clientData = res
      console.log(res);
    }
    )
  }

  onEdit(data:any){
    this.clientModelObj.id = data.id;
    this.clientForm.controls['name'].setValue(data.name);
    this.clientForm.controls['lastname'].setValue(data.lastname);
    this.clientForm.controls['rut'].setValue(data.rut);
    this.clientForm.controls['email'].setValue(data.email);
    this.clientForm.controls['phone'].setValue(data.phone);
    this.clientForm.controls['phone2'].setValue(data.phone2);

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

    this.api.putPhone(this.clientModelObj, this.clientModelObj.id).subscribe({
      next:(res)=>{
        alert("Modificación enviada exitosamente")
      },
      error: () =>{
        alert("Error al enviar modificación")
      }
    }
    )

  }


}
