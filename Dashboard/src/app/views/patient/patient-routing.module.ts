import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { PatientEditComponent } from './patient-edit/patient-edit.component';
import { PatientAddComponent } from './patient-add/patient-add.component';
// import { AuthGuard } from '../Auth/guard/auth.guard';

// const routes: Routes = [
//   { path: '', component: PatientListComponent},
//   { path: 'details/:id', component: PatientDetailsComponent,canActivate:[AuthGuard]  },
//   { path: 'edit/:id', component: PatientEditComponent,canActivate:[AuthGuard] },
//   { path: 'add', component: PatientAddComponent ,canActivate:[AuthGuard]},
// ];
const routes: Routes = [
  { path: '', component: PatientListComponent },
  { path: 'details/:id', component: PatientDetailsComponent },
  { path: 'edit/:id', component: PatientEditComponent },
  { path: 'add', component: PatientAddComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
