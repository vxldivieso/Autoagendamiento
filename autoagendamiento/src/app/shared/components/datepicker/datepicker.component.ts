import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'datepicker',
  template: `<mat-form-field color="primary" appearance="fill">
  <mat-label>Seleccione una fecha</mat-label>
  <input matInput [matDatepicker]="picker1">
  <mat-hint>MM/DD/AAAA</mat-hint>
  <mat-datepicker-toggle matSuffix [for]="picker1"></mat-datepicker-toggle>
  <mat-datepicker #picker1></mat-datepicker>
</mat-form-field>`,
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent{

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

}
