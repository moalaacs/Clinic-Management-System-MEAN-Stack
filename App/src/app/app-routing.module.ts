import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { MaterialModule } from 'src/material.moudel';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthGuard } from './Auth/guard/auth.guard';
import { AllAppointmentReportsComponent } from './appointment-reports/all-appointment-reports/all-appointment-reports.component';
import { LandingPageComponent } from './landing-page/landing-page.component';


const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    pathMatch: "full"
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'clinic',
    loadChildren: () =>
      import('./clinic/clinic.module').then((m) => m.ClinicModule),
  },
  {
    path: 'medicine',
    loadChildren: () =>
      import('./medicine/medicine.module').then((m) => m.MedicineModule),
  },
  {
    path: 'appointment',
    loadChildren: () =>
      import('./appointment/appointment.module').then(
        (m) => m.AppointmentModule
      ),
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
      import('./prescription/prescription.module').then((m) => m.PrescriptionModule),
  },
  {path: 'appointmentReports', component: AllAppointmentReportsComponent},
  { path: '**', component: NotfoundComponent },
];
@NgModule({
  declarations: [NotfoundComponent],
  imports: [RouterModule.forRoot(routes), MaterialModule, MatSnackBarModule],
  exports: [RouterModule, MaterialModule],
})
export class AppRoutingModule { }
