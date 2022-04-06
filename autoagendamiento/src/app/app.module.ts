import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {CdkStepperModule} from '@angular/cdk/stepper';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SchedulingComponent } from './pages/scheduling/scheduling.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { StepperComponent } from './pages/stepper/stepper.component';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { CUSTOM_ELEMENTS_SCHEMA }  from '@angular/core'; 

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SchedulingComponent,
    StepperComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MatStepperModule,
    MatButtonModule,
    MatInputModule,
  ],
  providers: [],
  schemas:[ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
