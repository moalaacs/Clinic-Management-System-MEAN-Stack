import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceReportsRoutingModule } from './invoice-reports-routing.module';
import { AllInvoiceReportsComponent } from './all-invoice-reports/all-invoice-reports.component';
import { DailyInvoiceReportsComponent } from './daily-invoice-reports/daily-invoice-reports.component';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { BadgeModule, CardModule, GridModule } from '@coreui/angular';

@NgModule({
  declarations: [
    AllInvoiceReportsComponent,
    DailyInvoiceReportsComponent
  ],
  imports: [
    CommonModule,
    InvoiceReportsRoutingModule,
    ChartjsModule,
    BadgeModule,
    CardModule,
    GridModule
  ]
})
export class InvoiceReportsModule { }
