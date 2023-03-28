import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesComponent } from './clinic-services/clinic-services.component';
import { ClinicsInfoByIdComponent } from './clinic-details/clinic-details.component';
import { AddClinicComponent } from './add-clinic/add-clinic.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AvailableClinicsComponent } from './availableClinics/availableClinics.component';
import { ClinicsInfoComponent } from './clinic-list/clinics-list.component';
import { AuthGuard } from './../Auth/guard/auth.guard';

const routes: Routes = [
  {
    path: '', component: ClinicsInfoComponent, canActivate: [AuthGuard],
    data: {
      title: 'Clinic',
    },
  },
  {
    path: "add",
    component: AddClinicComponent, canActivate: [AuthGuard],
    data: {
      title: 'Add',
    },
  },
  {
    path: "edit/:id",
    component: AddClinicComponent, canActivate: [AuthGuard]
  },
  {
    path: 'details/:id',
    component: ClinicsInfoByIdComponent, canActivate: [AuthGuard]
  },
  {
    path: 'services/:speciallity',
    component: ServicesComponent, canActivate: [AuthGuard]
  },
  {
    path: 'location/:speciallity',
    component: AvailableClinicsComponent, canActivate: [AuthGuard]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes), MatInputModule, MatSelectModule],
  exports: [RouterModule, MatInputModule, MatSelectModule]
})
export class ClinicRoutingModule { }
