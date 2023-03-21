import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './Dashboard.component';
import { ReportsModule } from './Reports/Reports.module';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DashboardComponent],
  exports: [ReportsModule]
})
export class DashboardModule { }
