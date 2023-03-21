import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentReportsComponent } from './AppointmentReports.component';
import { AllAppointmentsReportsComponent } from './AllAppointmentsReports/AllAppointmentsReports.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterLink } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,AppRoutingModule,RouterLink
  ],
  declarations: [AppointmentReportsComponent],
  exports: [AllAppointmentsReportsComponent]
})
export class AppointmentReportsModule { }
