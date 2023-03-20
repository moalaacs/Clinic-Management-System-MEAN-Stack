import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { MaterialModule } from 'src/material.moudel';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthGuard } from './Auth/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./landing-page/landing-page.module').then(
        (m) => m.LandingPageModule
      ),
    pathMatch: 'full',
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
    path: 'appointmentReports',
    loadChildren: () =>
      import(
        './Dashboard/Reports/AppointmentReports/AppointmentReports.module'
      ).then((m) => m.AppointmentReportsModule),
  },
  {
    path: 'patient',
    loadChildren: () =>
      import('./patient/patient.module').then((m) => m.PatientModule),canActivate:[AuthGuard]
  },
  {
    path: 'doctor',
    loadChildren: () =>
      import('./doctor/doctor.module').then((m) => m.DoctorModule),canActivate:[AuthGuard]
  },
  {
    path: 'employee',
    loadChildren: () =>
      import('./employee/employee.module').then((m) => m.EmployeeModule),canActivate:[AuthGuard]
  },
  { path: '**', component: NotfoundComponent },
];
@NgModule({
  declarations: [NotfoundComponent],
  imports: [RouterModule.forRoot(routes), MaterialModule,MatSnackBarModule],
  exports: [RouterModule, MaterialModule],
})
export class AppRoutingModule {}
