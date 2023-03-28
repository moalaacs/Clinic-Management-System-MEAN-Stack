import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AllInvoiceReportsComponent } from './all-invoice-reports/all-invoice-reports.component';
import { DailyInvoiceReportsComponent } from './daily-invoice-reports/daily-invoice-reports.component'
import { AuthGuard } from './../Auth/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    data: {
      title: "Invoices"
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'all'
      },
      {
        path: 'all',
        component: AllInvoiceReportsComponent, canActivate: [AuthGuard],
        data: {
          title: "All"
        }
      },
      {
        path: 'daily',
        component: DailyInvoiceReportsComponent, canActivate: [AuthGuard],
        data: {
          title: "Daily"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceReportsRoutingModule { }
