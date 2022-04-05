import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { SchedulingComponent } from './pages/scheduling/scheduling.component';
import { ConfirmClientData } from './pages/confirm_clientData/confirm_clientData.component';
import { ConfirmProduct } from './pages/confirm_product/confirm_product.component';
import { ConfirmService } from './pages/confirm_service/confirm_service.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SchedulingComponent,
    ConfirmClientData,
    ConfirmProduct,
    ConfirmService
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
