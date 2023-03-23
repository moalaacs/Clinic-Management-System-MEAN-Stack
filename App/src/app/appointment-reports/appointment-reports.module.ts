import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentReportsRoutingModule } from './appointment-reports-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { ImageModule } from 'primeng/image';
import { ChartModule } from 'primeng/chart';
import { AllAppointmentReportsComponent } from './all-appointment-reports/all-appointment-reports.component';
// import { AllAppointmentReportsComponent } from './all-appointment-reports/all-appointment-reports.component';
@NgModule({
  declarations: [AllAppointmentReportsComponent],
  imports: [
    ChartModule,
    CommonModule,
    AppointmentReportsRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastModule,
    ButtonModule,
    RippleModule,
    FormsModule,
    ImageModule,
  ]
})
export class AppointmentReportsModule { }
