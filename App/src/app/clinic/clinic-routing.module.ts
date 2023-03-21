import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesComponent } from './clinic-services/clinic-services.component';
import { ClinicsInfoComponent } from './clinic-list/clinics-list.component';
import { ClinicsInfoByIdComponent } from './clinic-details/clinic-details.component';
import { AddClinicComponent } from './add-clinic/add-clinic.component';
import { SpecilizationComponent } from './specilization/specilization.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
const routes: Routes = [
  {
    path: '', component: SpecilizationComponent,
  },
  {
    path: "add",
    component: AddClinicComponent
  },
  {
    path: 'details/:id',
    component: ClinicsInfoByIdComponent
  },
  {
    path: 'services/:speciallity',
    component: ServicesComponent
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes), MatInputModule, MatSelectModule],
  exports: [RouterModule, MatInputModule, MatSelectModule]
})
export class ClinicRoutingModule { }
