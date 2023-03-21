import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageModule } from './landing-page/landing-page.module';
import { ClinicModule } from './clinic/clinic.module';
import { SpecilityToImagePipe } from './pipes/specility-to-image.pipe';
import { MedicineModule } from './medicine/medicine.module';
import { AppointmentModule } from './appointment/appointment.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MedicineDetailsComponent } from './medicine/medicine-details/medicine-details.component';
import { DashboardModule } from './Dashboard/Dashboard.module';
import { AllAppointmentsReportsComponent } from './Dashboard/Reports/AppointmentReports/AllAppointmentsReports/AllAppointmentsReports.component';
import { ReportsModule } from './Dashboard/Reports/Reports.module';
import { AppointmentReportsComponent } from './Dashboard/Reports/AppointmentReports/AppointmentReports.component';
import { AppointmentReportsModule } from './Dashboard/Reports/AppointmentReports/AppointmentReports.module';
@NgModule({
  declarations: [
    AppComponent,
    SpecilityToImagePipe, MedicineDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule, NgbModule,
    FormsModule, ReactiveFormsModule,
    LandingPageModule, FlexLayoutModule,
    ClinicModule, MedicineModule, AppointmentModule, MatSlideToggleModule, MatInputModule,
    MatCardModule, MatFormFieldModule, MatNativeDateModule, DatePipe, MatIconModule,
    DashboardModule, ReportsModule, AppointmentReportsModule
  ],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
