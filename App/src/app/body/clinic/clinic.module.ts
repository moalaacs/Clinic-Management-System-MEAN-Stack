import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ClinicRoutingModule } from './clinic-routing.module';
import { ClinicComponent } from './clinic.component';
import { ServicesComponent } from './services/services.component';
import { ClinicsInfoComponent } from './clinics-info/clinics-info.component';
import { ClinicsInfoByIdComponent } from './clinics-info-by-id/clinics-info-by-id.component';
import { AddClinicComponent } from './add-clinic/add-clinic.component';
import { SpecilizationComponent } from './specilization/specilization.component';

@NgModule({
  declarations: [
    ClinicComponent, ServicesComponent, ClinicsInfoComponent, ClinicsInfoByIdComponent, AddClinicComponent, SpecilizationComponent
  ],
  imports: [
    CommonModule,
    ClinicRoutingModule,
    ReactiveFormsModule
  ],
})
export class ClinicModule { }
