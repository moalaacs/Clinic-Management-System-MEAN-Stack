import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { MaterialModule } from 'src/app/shared/material.moduel';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthGuard } from './Auth/guard/auth.guard';
import { AllAppointmentReportsComponent } from './appointment-reports/all-appointment-reports/all-appointment-reports.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ChartModule } from 'primeng/chart';
import { SpecilizationComponent } from './clinic/specilization/specilization.component';
import { PaymentAddComponent } from './payment/payment-add/payment-add.component';
const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'pay', component: PaymentAddComponent,canActivate:[AuthGuard] },
  {
    path: 'clinic',
    loadChildren: () =>
      import('./clinic/clinic.module').then((m) => m.ClinicModule),canActivate:[AuthGuard]
  },
  {
    path: 'invoice',
    loadChildren: () =>
      import('./invoice/invoice.module').then((m) => m.InvoiceModule),canActivate:[AuthGuard]
  },
  {
    path: 'medicine',
    loadChildren: () =>
      import('./medicine/medicine.module').then((m) => m.MedModule),canActivate:[AuthGuard]
  },
  {
    path: 'appointment',
    loadChildren: () =>
      import('./appointment/appointment.module').then(
        (m) => m.AppointModule
      ),canActivate:[AuthGuard]
  },
  {
    path: 'patient',
    loadChildren: () =>
      import('./patient/patient.module').then((m) => m.PatientModule), canActivate: [AuthGuard]
  },
  {
    path: 'doctor',
    loadChildren: () =>
      import('./doctor/doctor.module').then((m) => m.DoctorModule), canActivate: [AuthGuard]
  },
  {
    path: 'employee',
    loadChildren: () =>
      import('./employee/employee.module').then((m) => m.EmployeeModule), canActivate: [AuthGuard]
  },
  {
    path: 'prescription',
    loadChildren: () =>
      import('./prescription/prescription.module').then((m) => m.PrescriptionModule),canActivate:[AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  { path: '', component: LandingPageComponent, pathMatch: 'full' },
  { path: 'appointmentReports', component: AllAppointmentReportsComponent ,canActivate:[AuthGuard] },
  { path: 'departments', component: SpecilizationComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: '**', component: NotfoundComponent },
];
@NgModule({
  declarations: [NotfoundComponent],
  imports: [RouterModule.forRoot(routes), MaterialModule, MatSnackBarModule, ChartModule],
  exports: [RouterModule, MaterialModule],
})
export class AppRoutingModule { }
