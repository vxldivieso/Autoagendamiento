import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { switchMap, tap } from 'rxjs';
import { DetailOrder, Services } from './interfaces/detail.interface';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { DetailOrderService, ModifyProductService, ModifyService } from './service/detail.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
//DetailOrder
@Component({
  selector: 'detail-order',
  templateUrl: './detailOrder.component.html',
  styleUrls: ['./detailOrder.component.scss']
})
export class DetailComponent implements OnInit {
  detailsOrder!: DetailOrder[];
  displayedColumns : string[] = ['orderId', 'quantity', 'productName','servicio','proveedor'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private detailOrderSvc: DetailOrderService) { }
  ngOnInit(): void {
    this.getCalendario();
  }
  getCalendario(){
    this.detailOrderSvc.getDetailOrder()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(res);
      }
    })
  }
}

//EditOrder
@Component({
  selector: 'edit-product',
  templateUrl: './editproduct/editproduct.component.html',
  styleUrls: ['./editproduct/editproduct.component.scss']
})

export class EditProductComponent implements OnInit{
  changeProductForm !: FormGroup;
  constructor(private formBuilder: FormBuilder, 
    private api: ModifyProductService){}
  
  ngOnInit(): void {
    this.changeProductForm = this.formBuilder.group({
      nameProduct: ['',Validators.required],
      skuProduct: ['',Validators.required],
      img: ['',Validators.required]
    })
  }

  onSubmit(): void{
    if(this.changeProductForm.valid){
      this.api.postChangeProduct(this.changeProductForm.value)
      .subscribe({
        next:(res)=>{
          alert("Modificación enviada exitosamente")
        },
        error: () =>{
          alert("Error al enviar modificación")
        }
      })
    }
  }

}

//Form edit product dialog
@Component({
  selector: 'editproduct-dialog',
  template: `<button mat-button (click)="openDialog()"><mat-icon>create</mat-icon></button>`,
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
  services = ["Armado", "Instalación", "Despacho"];
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
          alert("Modificación enviada exitosamente")
        },
        error: () =>{
          alert("Error al enviar modificación")
        }
      })
    }
  }
}

//Edit service dialog

@Component({
  selector: 'editservice-dialog',
  template: `<button mat-button (click)="openDialog()"><mat-icon>create</mat-icon></button>`,
})
export class EditServiceDialog{
  constructor(private dialog: MatDialog ){}
  openDialog() {
    this.dialog.open(EditServiceComponent, {
      width:'500px'
    });
  }
}







