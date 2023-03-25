import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PatientRoutingModule } from './patient-routing.module';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { PatientAddComponent } from './patient-add/patient-add.component';
import { PatientEditComponent } from './patient-edit/patient-edit.component';
import { MaterialModule } from '../shared/material.moduel';
@NgModule({
  declarations: [
    PatientListComponent,
    PatientDetailsComponent,
    PatientAddComponent,
    PatientEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule, PatientRoutingModule,
    ReactiveFormsModule, MaterialModule
  ]
})


export class PatientModule { }
