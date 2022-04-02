import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CarBrandComponent } from './car-brand/car-brand.component';
import { BrandHeaderComponent } from './car-brand/components/brand-header/brand-header.component';
import { BrandTableComponent } from './car-brand/components/brand-table/brand-table.component';
import { AngularMaterialModule } from './shared/material.module';
import { HttpRequestService } from './services/http/http-request.service';
import { HttpClientModule } from '@angular/common/http';
import { DialogConfirmDeleteBrandComponent } from './car-brand/components/dialog-confirm-delete-brand/dialog-confirm-delete-brand.component';
import { DialogAddUpdateBrandComponent } from './car-brand/components/dialog-add-update-brand/dialog-add-update-brand.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DashboardComponent,
    CarBrandComponent,
    BrandHeaderComponent,
    BrandTableComponent,
    DialogConfirmDeleteBrandComponent,
    DialogAddUpdateBrandComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [HttpRequestService],
  bootstrap: [AppComponent],
})
export class AppModule {}
