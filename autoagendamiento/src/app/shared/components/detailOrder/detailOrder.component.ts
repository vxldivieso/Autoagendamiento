import { Component, OnInit, isDevMode, enableProdMode } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DetailOrderService, ModifyProductService, ModifyService } from 'src/app/service/detail.service';

//DetailOrder
@Component({
  selector: 'detail-order',
  templateUrl: './detailOrder.component.html',
  styleUrls: ['./detailOrder.component.scss']
})
export class DetailComponent implements OnInit {
  details:any

  
  order!: number;
  token!: string;
  constructor(private api: DetailOrderService, private route : ActivatedRoute) {
    this.order = this.route.snapshot.params['order'];
    this.token = this.route.snapshot.params['token'];
   }
  ngOnInit(): void {
    this.getOrderId()
  }
  
  getOrderId(){
    if (isDevMode()) {
      this.api.getOrderDEV(this.order, this.token).subscribe((resp:any)=>{
        this.details = resp;
      })
    }
    else
      this.api.getOrderId(this.order, this.token).subscribe((resp:any)=>{
        this.details = resp;
      })
  }
  
}

//EditProduct
@Component({
  selector: 'edit-product',
  templateUrl: './editproduct/editProduct.component.html',
  styleUrls: ['./editproduct/editProduct.component.scss']
})


export class EditProductComponent implements OnInit{
  changeProductForm !: FormGroup;
  constructor(private formBuilder: FormBuilder, 
    private api: ModifyProductService){}
  
  ngOnInit(): void {
    this.changeProductForm = this.formBuilder.group({
      nameProduct: [''],
      skuProduct: [''],
      img: ['']
    })
  }

  

  onSubmit(): void{
    if (isDevMode()) {
      if(this.changeProductForm.valid){
        this.api.postChangeProduct(this.changeProductForm.value)
        .subscribe({
          next:(res)=>{
            this.messageSuccessfull();
          },
          error: () =>{
            this.messageError();
          }
        })
      } 
    }
    else
      if(this.changeProductForm.valid){
        this.api.postChangeProduct(this.changeProductForm.value)
        .subscribe({
          next:(res)=>{
            this.messageSuccessfull();
          },
          error: () =>{
            this.messageError();
          }
        })
      } 
  }
//Message successfull
messageSuccessfull(){
  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    customClass: {
      popup: 'colored-toast'
    },
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  Toast.fire({
    icon: 'success',
    title: 'Verificaremos los datos'
  })
}
//Message Error
messageError(){
  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  Toast.fire({
    icon: 'error',
    title: 'Ups.. Algo ocurrió'
  })
}
  

}

//Form edit product dialog
@Component({
  selector: 'editproduct-dialog',
  template: `<a (click)="openDialog()">Editar producto</a>`,
  styleUrls: ['./detailOrder.component.scss']
})
export class EditProductDialog{
  constructor(private dialog: MatDialog ){}
  openDialog() {
    this.dialog.open(EditProductComponent, {
      width:'500px'
    });
  }
}


//Edit service Component
@Component({
  selector: 'edit-service',
  templateUrl: './editService/editService.component.html',
  styleUrls: ['./editService/editService.component.scss']
})
export class EditServiceComponent implements OnInit{
  services = ["Armado Mueble", "Armado Parrilla", "Inspección Técnica de muebles", "Retiro ecológico"];
  changeServiceForm !: FormGroup;
  constructor(private formBuilder: FormBuilder, 
    private api: ModifyService){}
  
  ngOnInit(): void {
    this.changeServiceForm = this.formBuilder.group({
      selectService: ['', Validators.required]
    })
  }

  onSubmit(): void{
    if(this.changeServiceForm.valid){
      this.api.postChangeService(this.changeServiceForm.value)
      .subscribe({
        next:(res)=>{
          this.messageSuccessfull();
          
        },
        error: () =>{
          this.messageError();  
        }
      })
    }
  }

//Message successfull
messageSuccessfull(){
  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    customClass: {
      popup: 'colored-toast'
    },
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  Toast.fire({
    icon: 'success',
    title: 'Verificaremos los datos',
  })
}
//Message Error
messageError(){
  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  Toast.fire({
    icon: 'error',
    title: 'Ups.. Algo ocurrió'
  })
}
}

//Edit service dialog

@Component({
  selector: 'editservice-dialog',
  template: `<a (click)="openDialog()" class="btn">Editar servicio</a>`,
  styleUrls: ['./detailOrder.component.scss']
})
export class EditServiceDialog{
  constructor(private dialog: MatDialog ){}
  openDialog() {
    this.dialog.open(EditServiceComponent, {
      width:'500px'
    });
  } 
  closeDialog(){
    this.dialog.closeAll();
  }
}







