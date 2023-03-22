import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { AppointmentReportsRoutingModule } from './appointment-reports-routing.module';
import { AllAppointmentReportsComponent } from './all-appointment-reports/all-appointment-reports.component';


@NgModule({
  declarations: [
    AllAppointmentReportsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterLink,
    AppRoutingModule,
    ReactiveFormsModule,
    AppointmentReportsRoutingModule
  ]
})
export class AppointmentReportsModule { }
