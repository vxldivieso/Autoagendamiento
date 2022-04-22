import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateService } from '../detailOrder/service/detail.service';

@Component({
  selector: 'datepicker',
  template: ``,
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent{

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

}


@Component({
  selector:'dateProduct',
  templateUrl: './datepicker.component.html',
})


export class DateFormProduct{
  @Output()
  dateProductForm !: FormGroup;
  isSend:boolean = false;
  constructor(private formBuilder: FormBuilder, 
    private api: DateService){}
  
  ngOnInit(): void {
    this.dateProductForm = this.formBuilder.group({
      dateProduct: ['',Validators.required],
    })
  }

  onSubmit(): void{
    if(this.dateProductForm.valid){
      this.api.postDateProduct(this.dateProductForm.value)
      .subscribe({
        next:(res)=>{
          alert("Modificación enviada exitosamente, por favor confirme los datos del producto.")
          this.isSend = !this.isSend;

        },
        error: () =>{
          alert("Error al enviar modificación")
        }
      })
    }
  }
}
