import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllAppointmentReportsComponent } from './all-appointment-reports/all-appointment-reports.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
const routes: Routes = [
  { path: "", component: AllAppointmentReportsComponent }
];

@NgModule({
  declarations: [
  ],
  imports: [RouterModule.forChild(routes), CommonModule, FormsModule],
  exports: [RouterModule]
})
export class AppointmentReportsRoutingModule { }
