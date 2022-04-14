import { Component, Inject, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { DetailOrder } from './interfaces/detail.interface';
import { DetailOrderService } from './service/detail.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'detail-order',
  templateUrl: './detailOrder.component.html',
  styleUrls: ['./detailOrder.component.scss']
})
export class DetailComponent implements OnInit {
  details!: DetailOrder[];

  constructor(private detailOrderSvc: DetailOrderService) { }
  ngOnInit(): void {
    this.detailOrderSvc.getDetailOrder()
    .pipe(
      tap((details: DetailOrder[]) => this.details = details)
    )
    .subscribe()
  }

}

//Edit Product
export interface DialogData {
  animal: string;
  name: string;
}

/**
 * @title Dialog Overview
 */

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct/editproduct.component.html',
})
export class EditProduct {

  animal!: string;
  name!: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(EditProductDialog, {
      width: '400px',
      data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}

@Component({
  selector: 'app-editproductDialog',
  templateUrl: './editproduct/editproductDialog.component.html',
  styleUrls: ['./editproduct/editproduct.component.scss']
})
export class EditProductDialog {

  constructor(
    public dialogRef: MatDialogRef<EditProductDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

//Upload image
@Component({
  selector: 'upload-image',
  template:`<div>
    <input type="file">
  </div>`,
})
export class UploadImage implements OnInit{
  constructor(){

  }

  ngOnInit(): void {
    
  }
}



//Edit Service
@Component({
  selector: 'app-editservice',
  templateUrl: './editservice/editservice.component.html',
  styleUrls: ['./editservice/editservice.component.scss']
})
export class Editservice {

  service!: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(EditServiceDialog, {
      width: '350px',
      data: { service: this.service},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.service = result;
    });
  }

}
@Component({
  selector: 'app-editServiceDialog',
  templateUrl: './editservice/editserviceDialog.component.html',
  styleUrls: ['./editservice/editservice.component.scss']
})
export class EditServiceDialog {

  constructor(
    public dialogRef: MatDialogRef<EditServiceDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

//Select service
interface Servicios {
  viewValue: string;
}
@Component({
  selector: 'select-service',
  template: `<mat-label>Servicio</mat-label>
  <mat-select>
    <mat-option *ngFor="let service of services" [value]="service.viewValue" >
      {{service.viewValue}}
    </mat-option>
  </mat-select>`,
  styleUrls: ['./editservice/editservice.component.scss']
})
export class SelectComponent {
  services : Servicios[] = [
    {viewValue : 'Armado'},
    {viewValue : 'Despacho'},
    {viewValue : 'Instalación'}
  ]
}









