import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from "./notfound/notfound.component"
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./landing-page/landing-page.module').then(m => m.LandingPageModule),
    pathMatch: 'full'
  },
  {
    path: 'clinic',
    loadChildren: () => import('./body/clinic/clinic.module').then(m => m.ClinicModule)
  },
  {
    path: 'medicine',
    loadChildren: () => import('./body/medicine/medicine.module').then(m => m.MedicineModule)
  },
  {
    path: 'appointment',
    loadChildren: () => import('./body/appointment/appointment.module').then(m => m.AppointmentModule)
  },
  {
    path: 'appointmentReports',
    loadChildren: () => import('./Dashboard/Reports/AppointmentReports/AppointmentReports.module').then(m => m.AppointmentReportsModule)
  },
  {
    path: 'patient',
    loadChildren: () => import('./patient/patient.module').then(m => m.PatientModule)
  },
  { path: 'doctor', loadChildren: () => import('./doctor/doctor.module').then(m => m.DoctorModule) },
  { path: 'employee', loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule) }
];
@NgModule({
  declarations: [NotfoundComponent],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
