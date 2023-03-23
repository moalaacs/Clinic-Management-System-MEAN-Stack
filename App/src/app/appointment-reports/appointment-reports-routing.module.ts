import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllAppointmentReportsComponent } from './all-appointment-reports/all-appointment-reports.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
const routes: Routes = [
  { path: "", component: AllAppointmentReportsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, FormsModule, ChartModule],
  exports: [RouterModule]
})
export class AppointmentReportsRoutingModule { }
