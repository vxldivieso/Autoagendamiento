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
import { RadiobuttonComponent } from './shared/components/radiobutton/radiobutton.component';
import { ClientDataComponent } from './shared/components/client-data/client-data.component';
import { SelectComponent } from './shared/components/select/select.component';
import { DetailComponent } from './shared/components/detailOrder/detailOrder.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SchedulingComponent,
    StepperComponent,
    RadiobuttonComponent,
    ClientDataComponent,
    SelectComponent,
    DetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  schemas:[ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
