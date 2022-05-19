import { Component, OnInit, isDevMode, enableProdMode, OnDestroy } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DetailOrderService, ModifyProductService} from 'src/app/service/detail.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { map, Observable, ReplaySubject, Subject, takeUntil } from 'rxjs';
import { RouteService } from 'src/app/service/route.service';
import { DomSanitizer } from '@angular/platform-browser';

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

  
  order!: any;
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
  img?:string | void;
  base64Output !: string;
  fileSelected!: Blob

  
  constructor(private formBuilder: FormBuilder, 
    private api: ModifyProductService, private dialog: MatDialog, private route : ActivatedRoute,
    private service : RouteService, private sant: DomSanitizer){
      this.order = this.route.snapshot.params['order'];
      this.token = this.route.snapshot.params['token'];
    }
  
  ngOnInit(): void {
    this.changeProductForm = this.formBuilder.group({
      nameProduct: [''],
      skuProduct: [''],
      img: ['']
    })

    //params nonroute
    this.pathParam = this.service.pathParam;
    this.pathParam.subscribe(res=>{
      this.orderParam = res
    })

    this.pathParamToken = this.service.pathParamToken;
    this.pathParamToken.subscribe(res=>{
      this.tokenParam = res
      
    })
    this.getRequestId()
    
  }

  getRequestId(){
    if (isDevMode()) {
      this.api.getRequestDEV(this.orderParam, this.tokenParam).subscribe((resp:any)=>{
        this.requests = resp.request_id;
      })
    }
    else
      this.api.getRequest(this.orderParam, this.tokenParam).subscribe((resp:any)=>{
        this.requests = resp.request_id;
      })
  }
  
  onFileSelected(files: FileList):void {
    this.fileSelected = files[0];
    this.img = this.sant.bypassSecurityTrustUrl(window.URL.createObjectURL(this.fileSelected)) as string;
    this.base64Output;
    this.convertFileToBase64()
  }

  convertFileToBase64(){
    let reader = new FileReader();
    if (this.fileSelected){
      reader.readAsDataURL(this.fileSelected as Blob)
      reader.onloadend = () => {this.base64Output = reader.result as string;}
    }
    
  }


  onSubmit(): void{
    
    this.name = this.changeProductForm.controls['nameProduct'].value
    this.sku = this.changeProductForm.controls['skuProduct'].value 
    this.changeProductForm.controls['img'].patchValue(this.requests.attachment)

    this.convertFileToBase64()
    let imgB64 = JSON.stringify(this.base64Output)
    
    if (isDevMode()) {
      if(this.changeProductForm.valid){
        let message :string = "Datos Producto (Modificados): \n";
        if (this.name != null ){
          message += `Nombre Producto: ${this.name} \n`
        }
        if (this.sku != null){
          message += `SkuProducto: ${this.sku} \n`
        }
        if (imgB64 != null){
          let attachment = imgB64;
          this.api.putRequestIMGDEV(message, attachment, this.requests, this.tokenParam)
          .subscribe({
            next:(res)=>{
              res
              this.dialog.closeAll();
              this.messageSuccessfull();
            },
            error: () =>{
              this.messageError();
            }
          })
        }
        else
        this.api.putRequestDEV(message, this.requests, this.tokenParam)
          .subscribe({
            next:(res)=>{
              res
              this.dialog.closeAll();
              this.messageSuccessfull();
            },
            error: () =>{
              this.messageError();
            }
          })
      }
      else
      this.messageError(); 
    }
    else
      if(this.changeProductForm.valid){
        let message :string = "Datos Producto (Modificados): \n";
        
        if (this.name != null ){
          message += `NombreProducto: ${this.name} \n`
        }
        if (this.sku != null){
          message += `SkuProducto: ${this.sku} \n`
        }
        if (imgB64 != null){
          let attachment = imgB64;
          this.api.putRequestIMG(message, attachment, this.requests, this.tokenParam)
          .subscribe({
            next:(res)=>{
              res
              this.dialog.closeAll();
              this.messageSuccessfull();
            },
            error: () =>{
              this.messageError();
            }
          }) 
        }
        else
        this.api.putRequest(message, this.requests, this.tokenParam)
          .subscribe({
            next:(res)=>{
              res
              this.dialog.closeAll();
              this.messageSuccessfull();
            },
            error: () =>{
              this.messageError();
            }
          }) 
      }
      else
      this.messageError(); 

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
  template: `<a (click)="openDialog()" class="btn" id="btn">Editar Producto</a>`,
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
  changeServiceForm !: FormGroup;
  requests : any;

  orderParam!: any;
  tokenParam!: any;
  
  pathParam !: Observable<string | null>
  pathParamToken !: Observable<string | null>
  constructor(private formBuilder: FormBuilder, 
    private api: ModifyProductService, private dialog: MatDialog, private service : RouteService ){}
  
  ngOnInit(): void {
    this.changeServiceForm = this.formBuilder.group({
      servicioModificado: ['', Validators.required]
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
    this.getRequestId()
  }
  getRequestId(){
    if (isDevMode()) {
      this.api.getRequestDEV(this.orderParam, this.tokenParam).subscribe((resp:any)=>{
        this.requests = resp.request_id;
      })
    }
    else
      this.api.getRequest(this.orderParam, this.tokenParam).subscribe((resp:any)=>{
        this.requests = resp.request_id;
      })
  }

  onSubmit(): void{
    let valor = this.changeServiceForm.value
    let parseString = JSON.stringify(valor)
    if (isDevMode()) {
      if(this.changeServiceForm.valid){
        this.api.putRequestDEV(parseString, this.requests, this.tokenParam)
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
    if(this.changeServiceForm.valid){
      this.api.putRequest(parseString, this.requests, this.tokenParam)
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







