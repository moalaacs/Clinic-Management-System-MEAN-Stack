import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { PatientEditComponent } from './patient-edit/patient-edit.component';
import { PatientAddComponent } from './patient-add/patient-add.component';

const routes: Routes = [
  { path: '', component: PatientListComponent },
  { path: 'patient/details/:id', component: PatientDetailsComponent },
  { path: 'patient/edit/:id', component: PatientEditComponent },
  { path: 'patient/add', component: PatientAddComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
