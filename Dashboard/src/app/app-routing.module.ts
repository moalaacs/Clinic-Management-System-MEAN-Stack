import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'theme',
        loadChildren: () =>
          import('./views/theme/theme.module').then((m) => m.ThemeModule)
      },
      {
        path: 'appointments',
        loadChildren: () =>
          import('./views/appointment-reports/appointment-reports.module').then((m) => m.AppointmentReportsModule)
      },
      {
        path: 'invoices',
        loadChildren: () =>
          import('./views/invoice-reports/invoice-reports.module').then((m) => m.InvoiceReportsModule)
      },
      {
        path: 'clinic',
        loadChildren: () =>
          import('./views/clinic/clinic.module').then((m) => m.ClinicModule),
      },
      {
        path: 'doctor',
        loadChildren: () =>
          import('./views/doctor/doctor.module').then((m) => m.DoctorModule),
      },
      {
        path: 'patient',
        loadChildren: () =>
          import('./views/patient/patient.module').then((m) => m.PatientModule),
      },
      {
        path: 'employee',
        loadChildren: () =>
          import('./views/employee/employee.module').then((m) => m.EmployeeModule),
      },
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
