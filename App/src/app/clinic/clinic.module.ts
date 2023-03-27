import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ClinicRoutingModule } from './clinic-routing.module';
import { ServicesComponent } from './clinic-services/clinic-services.component';
import { ClinicsInfoComponent } from './clinic-list/clinics-list.component';
import { ClinicsInfoByIdComponent } from './clinic-details/clinic-details.component';
import { AddClinicComponent } from './add-clinic/add-clinic.component';
import { AvailableClinicsComponent } from './availableClinics/availableClinics.component';
import { MaterialModule } from 'src/app/shared/material.moduel';
@NgModule({
  declarations: [AvailableClinicsComponent, ClinicsInfoComponent, AddClinicComponent,
    ServicesComponent, ClinicsInfoByIdComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    ClinicRoutingModule,
    ReactiveFormsModule,
  ],
})
export class ClinicModule { }
