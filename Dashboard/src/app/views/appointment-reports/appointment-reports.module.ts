import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BadgeModule, CardModule, GridModule } from '@coreui/angular';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { AppointmentReportsRoutingModule } from './appointment-reports-routing.module';
import { AllAppointmentReportsComponent } from './all-appointment-reports/all-appointment-reports.component';
import { DailyAppointmentReportsComponent } from './daily-appointment-reports/daily-appointment-reports.component';
import { RangeAppointmentReportsComponent } from './range-appointment-reports/range-appointment-reports.component';
import { DoctorAppointmentReportsComponent } from './doctor-appointment-reports/doctor-appointment-reports.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { WidgetsModule } from '../widgets/widgets.module';
import { IconModule } from '@coreui/icons-angular';
import {
  ButtonModule,
  DropdownModule,
  ProgressModule,
  SharedModule,
  WidgetModule
} from '@coreui/angular';
import { PatientAppointmentReportsComponent } from './patient-appointment-reports/patient-appointment-reports.component';

@NgModule({
  declarations: [AllAppointmentReportsComponent, DailyAppointmentReportsComponent, RangeAppointmentReportsComponent, DoctorAppointmentReportsComponent, PatientAppointmentReportsComponent],
  imports: [
    CommonModule,
    AppointmentReportsRoutingModule,
    FormsModule,
    ChartjsModule,
    BadgeModule,
    CardModule,
    GridModule,
    DocsComponentsModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    WidgetsModule,
    ButtonModule,
    DropdownModule,
    ProgressModule,
    SharedModule,
    WidgetModule,
    IconModule,
  ]
})
export class AppointmentReportsModule { }
