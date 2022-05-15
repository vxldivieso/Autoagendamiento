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
import { StepperComponent } from './pages/stepper/stepper.component';
import { ContactComponent,ContactDialog,NoDisponibilityComponent, NoDisponibilityDialog, ReagendarComponent, ReagendarDialog, SchedulingComponent } from './shared/components/scheduling/scheduling.component';
import { CheckoutProductComponent } from './shared/components/checkoutProduct/checkoutProduct.component';
import { DateFormProduct} from './shared/components/datepicker/datepicker.component';
import { EndProcessComponent } from './shared/components/end-process/end-process.component';
import { DetailComponent, EditProductComponent, EditProductDialog, EditServiceComponent, EditServiceDialog} from './shared/components/detailOrder/detailOrder.component';
import { AgGridModule } from 'ag-grid-angular';
import { ClientDataComponent, WrongdataComponent, WrongDataDialog } from './shared/components/client-data/client-data.component';
import { CdkTableModule } from '@angular/cdk/table';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

//I keep the new line
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    StepperComponent,
    ClientDataComponent,
    SchedulingComponent,
    ReagendarComponent,
    CheckoutProductComponent,
    DateFormProduct,
    EndProcessComponent,
    DetailComponent,
    EditProductComponent,
    EditProductDialog,
    DateFormProduct,
    EditServiceComponent,
    EditServiceDialog,
    ReagendarDialog,
    WrongDataDialog,
    WrongdataComponent,
    NoDisponibilityComponent,
    NoDisponibilityDialog,
    ContactComponent,
    ContactDialog
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
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: { displayDefaultIndicatorType: false}
  }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  
}
