import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { DoctorDetailsComponent } from './doctor-details/doctor-details.component';
import { DoctorEditComponent } from './doctor-edit/doctor-edit.component';
import { DoctorAddComponent } from './doctor-add/doctor-add.component';


// const routes: Routes = [
// { path: '', component: DoctorListComponent },
// { path: 'details/:id', component: DoctorDetailsComponent },
// { path: 'edit/:id', component: DoctorEditComponent },
// { path: 'add', component: DoctorAddComponent }
// ];


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Doctors',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '',
      },
      {
        path: 'doctor',
        component: DoctorListComponent,
        data: {
          title: 'All',
        },
      },
      {
        path: 'details/:id',
        component: DoctorDetailsComponent,
        data: {
          title: 'Daily',
        }
      },
      {
        path: 'edit/:id',
        component: DoctorEditComponent,
        data: {
          title: 'Range',
        }
      },
      {
        path: 'add',
        component: DoctorAddComponent,
        data: {
          title: 'Range',
        }
      }
    ],
  },
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
