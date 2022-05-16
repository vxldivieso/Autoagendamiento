import { Component, OnInit, isDevMode, enableProdMode, OnDestroy } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DetailOrderService, ModifyProductService, ModifyService } from 'src/app/service/detail.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { RouteService } from 'src/app/service/route.service';

//DetailOrder
@Component({
  selector: 'detail-order',
  templateUrl: './detailOrder.component.html',
  styleUrls: ['./detailOrder.component.scss'],
  animations:[
    trigger('enterState',[
      state('void',style({
        opacity: 0 
      })),
      transition(':enter',[
        animate(300,style({
          opacity: 1
        }))
      ])
    ])
  ]
})
export class DetailComponent implements OnInit, OnDestroy {
  details:any

  
  order!: number;
  token!: string;

  private destroy = new Subject<void>();
  constructor(private api: DetailOrderService, private route : ActivatedRoute, private service : RouteService) {
    this.order = this.route.snapshot.params['order'];
    this.token = this.route.snapshot.params['token'];
  }
  ngOnInit(): void {
    this.getOrderId()

    //route order
    this.route.paramMap
    .pipe(
      map(paramMap => paramMap.get('order')),
      takeUntil(this.destroy)
    )
    .subscribe(order => this.service.updatePathParamState(order));
    //route token
    this.route.paramMap
    .pipe(
      map(paramMap => paramMap.get('token')),
      takeUntil(this.destroy)
    )
    .subscribe(token => this.service.updatePathParamStateToken(token));
  }

  ngOnDestroy(): void {
    this.destroy.next()
    this.destroy.complete()
    this.service.updatePathParamState(null);
    this.service.updatePathParamStateToken(null);
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
  requests : any;
  order!: number;
  token!: string;

  orderParam!: any;
  tokenParam!: any;
  
  pathParam !: Observable<string | null>
  pathParamToken !: Observable<string | null>

  name!:string;
  sku!: string;
  img!:any;
  constructor(private formBuilder: FormBuilder, 
    private api: ModifyProductService, private dialog: MatDialog, private route : ActivatedRoute,
    private service : RouteService){
      this.order = this.route.snapshot.params['order'];
      this.token = this.route.snapshot.params['token'];
    }
  
  ngOnInit(): void {
    this.changeProductForm = this.formBuilder.group({
      nameProduct: [''],
      skuProduct: [''],
      img: ['']
    })
    this.pathParam = this.service.pathParam;
    this.pathParam.subscribe(res=>{
      this.orderParam = res
    })

    this.pathParamToken = this.service.pathParamToken;
    this.pathParamToken.subscribe(res=>{
      this.tokenParam = res
      
    })
    this.getRequest()
    
  }

  getRequest(){
    if (isDevMode()) {
      this.api.getRequestDEV(this.orderParam, this.tokenParam).subscribe((resp:any)=>{
        this.requests = resp.request_id;
      })
    }
    else
      this.api.getRequestDEV(this.orderParam, this.tokenParam).subscribe((resp:any)=>{
        this.requests = resp;
      })
  }

  onSubmit1(){
    this.name = this.changeProductForm.controls['nameProduct'].value
    this.api.putRequestDEV(this.name, this.requests, this.tokenParam)
          .subscribe({
            next:(res)=>{
              res
              console.log(this.name, 'Envío exitoso');
            }
          })
  }


  onSubmit(): void{
    this.name = this.changeProductForm.controls['nameProduct'].value
    this.sku = this.changeProductForm.controls['skuProduct'].value
    this.img = this.changeProductForm.controls['img'].value
    if (isDevMode()) {
      if(this.changeProductForm.valid){
        if (this.name != null){
          this.api.putRequestDEV(this.name, this.requests, this.tokenParam)
          .subscribe({
            next:(res)=>{
              res
            }
          })
        }
        if (this.sku != null){
          this.api.putRequestDEV(this.sku, this.requests, this.tokenParam)
          .subscribe({
            next:(res)=>{
              res
            }
          })
        }
        if (this.img != null){
          this.api.putRequestDEV(this.img, this.requests, this.tokenParam)
          .subscribe({
            next:(res)=>{
              res
            }
          })
        }
        
      }
      
    }
      /*if(this.changeProductForm.valid){
        this.api.postChangeProduct(this.changeProductForm.value)
        .subscribe({
          next:(res)=>{
            this.dialog.closeAll();
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
            this.dialog.closeAll();
            this.messageSuccessfull();
          },
          error: () =>{
            this.messageError();
          }
        })
      } */
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
  template: `<a (click)="openDialog()" class="btn">Editar Producto</a>`,
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

  orderParam!: string | null;
  tokenParam!: string | null;
  
  pathParam !: Observable<string | null>
  pathParamToken !: Observable<string | null>
  constructor(private formBuilder: FormBuilder, 
    private api: ModifyService, private dialog: MatDialog, private service : RouteService ){}
  
  ngOnInit(): void {
    this.changeServiceForm = this.formBuilder.group({
      selectService: ['', Validators.required]
    })
    //route order
    this.pathParam = this.service.pathParam;
    this.pathParam.subscribe(res=>{
      this.orderParam = res
    })
    //route token
    this.pathParamToken = this.service.pathParamToken;
    this.pathParamToken.subscribe(res=>{
      this.tokenParam = res
      
    })
  }

  onSubmit(): void{
    if (isDevMode()) {
      if(this.changeServiceForm.valid){
        this.api.postChangeService(this.changeServiceForm.value)
        .subscribe({
          next:(res)=>{
            this.dialog.closeAll();
            this.messageSuccessfull();
          },
          error: () =>{
            this.messageError();  
          }
        })
      }
    }

    if(this.changeServiceForm.valid){
      this.api.postChangeService(this.changeServiceForm.value)
      .subscribe({
        next:(res)=>{
          this.dialog.closeAll();
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







