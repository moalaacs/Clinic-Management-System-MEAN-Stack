import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { DoctorDetailsComponent } from './doctor-details/doctor-details.component';
import { DoctorEditComponent } from './doctor-edit/doctor-edit.component';
import { DoctorAddComponent } from './doctor-add/doctor-add.component';
import { MaterialModule } from '../shared/material.moudel';
@NgModule({
  declarations: [
    DoctorListComponent,
    DoctorDetailsComponent,
    DoctorEditComponent,
    DoctorAddComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DoctorRoutingModule,
    MaterialModule
  ]
})
export class DoctorModule { }
