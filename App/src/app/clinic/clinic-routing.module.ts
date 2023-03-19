import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClinicComponent } from './clinic.component';
import { ServicesComponent } from './services/services.component';
import { ClinicsInfoComponent } from './clinics-info/clinics-info.component';
import { ClinicsInfoByIdComponent } from './clinics-info-by-id/clinics-info-by-id.component';
import { AddClinicComponent } from './add-clinic/add-clinic.component';
import { SpecilizationComponent } from './specilization/specilization.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
const routes: Routes = [
  {
    path: '', component: ClinicComponent,
  },
  {
    path: "add",
    component: AddClinicComponent
  },
  {
    path: "availablespecilization",
    component: SpecilizationComponent
  },
  {
    path: 'info/:id',
    component: ClinicsInfoByIdComponent
  },
  {
    path: 'speciallity/:speciallity',
    component: ClinicsInfoComponent,
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
