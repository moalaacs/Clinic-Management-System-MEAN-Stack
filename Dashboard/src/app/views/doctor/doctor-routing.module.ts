import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { DoctorDetailsComponent } from './doctor-details/doctor-details.component';
import { DoctorEditComponent } from './doctor-edit/doctor-edit.component';
import { DoctorAddComponent } from './doctor-add/doctor-add.component';
import { AuthGuard } from './../Auth/guard/auth.guard';

const routes: Routes = [
  {
    path: '', component: DoctorListComponent, canActivate: [AuthGuard],
    data: {
      title: 'Doctor',
    },
  },
  {
    path: "details/:id",
    component: DoctorDetailsComponent, canActivate: [AuthGuard],
    data: {
      title: 'Doctor / Details',
    },
  },
  {
    path: "edit/:id",
    component: DoctorEditComponent, canActivate: [AuthGuard],
    data: {
      title: 'Doctor / Edit',
    },
  },
  {
    path: 'add',
    component: DoctorAddComponent, canActivate: [AuthGuard],
    data: {
      title: 'Doctor / Add',
    },
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
