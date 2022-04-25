import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { DialogDataExampleDialog, StepperComponent } from './pages/stepper/stepper.component';
import { SchedulingComponent } from './shared/components/scheduling/scheduling.component';
import { CheckoutProductComponent } from './shared/components/checkoutProduct/checkoutProduct.component';
import { DateFormProduct, DatepickerComponent } from './shared/components/datepicker/datepicker.component';
import { EndProcessComponent } from './shared/components/end-process/end-process.component';
import { DetailComponent, EditProductComponent, EditProductDialog, EditServiceComponent, EditServiceDialog} from './shared/components/detailOrder/detailOrder.component';
import { AgGridModule } from 'ag-grid-angular';
import { ClientDataComponent } from './shared/components/client-data/client-data.component';
import { CdkTableModule } from '@angular/cdk/table';

//I keep the new line
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    StepperComponent,
    ClientDataComponent,
    SchedulingComponent,
    CheckoutProductComponent,
    DatepickerComponent,
    EndProcessComponent,
    DetailComponent,
    EditProductComponent,
    EditProductDialog,
    DateFormProduct,
    EditServiceComponent,
    EditServiceDialog,
    DialogDataExampleDialog
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgGridModule,
    CdkTableModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  
}
