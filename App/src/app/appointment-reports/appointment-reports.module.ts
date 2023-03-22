import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentReportsRoutingModule } from './appointment-reports-routing.module';
import { AllAppointmentReportsComponent } from './all-appointment-reports/all-appointment-reports.component';


@NgModule({
  declarations: [
    AllAppointmentReportsComponent
  ],
  imports: [
    CommonModule,
    AppointmentReportsRoutingModule
  ]
})
export class AppointmentReportsModule { }
