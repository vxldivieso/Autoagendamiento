import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {CdkStepperModule} from '@angular/cdk/stepper';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SchedulingComponent } from './shared/components/scheduling/scheduling.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { StepperComponent } from './pages/stepper/stepper.component';
import { CUSTOM_ELEMENTS_SCHEMA }  from '@angular/core';
import { CheckoutProductComponent } from './shared/components/checkoutProduct/checkoutProduct.component';
import { DetailComponent, EditProduct, EditProductDialog, Editservice, EditServiceDialog, SelectComponent, UploadImage } from './shared/components/detailOrder/detailOrder.component';
import { ClientDataComponent } from './shared/components/client-data/client-data.component';
import { DatepickerComponent } from './shared/components/datepicker/datepicker.component';
import { EndProcessComponent } from './shared/components/end-process/end-process.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SchedulingComponent,
    StepperComponent,
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
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgModule
  ],
  providers: [],
  schemas:[ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
