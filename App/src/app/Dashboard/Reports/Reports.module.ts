import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './Reports.component';
import { AppointmentReportsModule } from './AppointmentReports/AppointmentReports.module';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ReportsComponent],
  exports:[AppointmentReportsModule]
})
export class ReportsModule { }
