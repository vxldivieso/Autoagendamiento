import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA }  from '@angular/core';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { StepperComponent } from './pages/stepper/stepper.component';
import { SchedulingComponent } from './shared/components/scheduling/scheduling.component';
import { CheckoutProductComponent } from './shared/components/checkoutProduct/checkoutProduct.component';
import { ClientDataComponent } from './shared/components/client-data/client-data.component';
import { DatepickerComponent } from './shared/components/datepicker/datepicker.component';
import { EndProcessComponent } from './shared/components/end-process/end-process.component';
import { DetailComponent, EditProduct, EditProductDialog, Editservice, EditServiceDialog, SelectComponent, UploadImage } from './shared/components/detailOrder/detailOrder.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    StepperComponent,
    SchedulingComponent,
    CheckoutProductComponent,
    ClientDataComponent,
    DatepickerComponent,
    EndProcessComponent,
    EditProduct,
    EditProductDialog,
    Editservice,
    EditServiceDialog,
    DetailComponent,
    UploadImage,
    SelectComponent
    
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
