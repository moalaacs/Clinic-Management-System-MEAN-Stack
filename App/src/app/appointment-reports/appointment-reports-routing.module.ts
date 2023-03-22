import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllAppointmentReportsComponent } from './all-appointment-reports/all-appointment-reports.component';

const routes: Routes = [
  { path: "", component: AllAppointmentReportsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentReportsRoutingModule { }
