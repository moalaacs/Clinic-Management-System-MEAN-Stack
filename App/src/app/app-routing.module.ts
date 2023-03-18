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
  }
];
@NgModule({
  declarations: [NotfoundComponent],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
