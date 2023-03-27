import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ClinicRoutingModule } from './clinic-routing.module';
import { ClinicsInfoComponent } from './clinic-list/clinics-list.component';
import { ClinicsInfoByIdComponent } from './clinic-details/clinic-details.component';
import { AddClinicComponent } from './add-clinic/add-clinic.component';
import { AvailableClinicsComponent } from './department-details/availableClinics.component';
import { MaterialModule } from 'src/app/shared/material.moduel';
@NgModule({
  declarations: [AvailableClinicsComponent, ClinicsInfoComponent, AddClinicComponent,
    ClinicsInfoByIdComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    ClinicRoutingModule,
    ReactiveFormsModule,
  ],
})
export class ClinicModule { }
