import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { DoctorDetailsComponent } from './doctor-details/doctor-details.component';
import { DoctorEditComponent } from './doctor-edit/doctor-edit.component';
import { DoctorAddComponent } from './doctor-add/doctor-add.component';

const routes: Routes = [
  {
    path: '', component: DoctorListComponent,
    data: {
      title: 'Doctor',
    },
  },
  {
    path: "details/:id",
    component: DoctorDetailsComponent,
    data: {
      title: 'Doctor / Details',
    },
  },
  {
    path: "edit/:id",
    component: DoctorEditComponent,
    data: {
      title: 'Doctor / Edit',
    },
  },
  {
    path: 'add',
    component: DoctorAddComponent,
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
