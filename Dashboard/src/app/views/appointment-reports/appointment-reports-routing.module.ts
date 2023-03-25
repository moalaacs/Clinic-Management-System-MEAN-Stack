import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllAppointmentReportsComponent } from './all-appointment-reports/all-appointment-reports.component';
import { DailyAppointmentReportsComponent } from './daily-appointment-reports/daily-appointment-reports.component';
import { RangeAppointmentReportsComponent } from './range-appointment-reports/range-appointment-reports.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Appointments',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'all',
      },
      {
        path: 'all',
        component: AllAppointmentReportsComponent,
        data: {
          title: 'All',
        },
      },
      {
        path: 'daily',
        component: DailyAppointmentReportsComponent,
        data: {
          title: 'Daily',
        }
      },
      {
        path: 'range',
        component: RangeAppointmentReportsComponent,
        data: {
          title: 'Range',
        }
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, FormsModule],
  exports: [RouterModule]
})
export class AppointmentReportsRoutingModule { }
