import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { PrescriptionAddComponent } from './prescription-add/prescription-add.component';
import { PrescriptionDetailsComponent } from './prescription-details/prescription-details.component';
import { PrescriptionEditComponent } from './prescription-edit/prescription-edit.component';
import { PrescriptionListComponent } from './prescription-list/prescription-list.component';
import { PrescriptionRoutingModule } from './prescription-routing.module';
import { MaterialModule } from './../../material.moudel';


@NgModule({
  declarations: [
    PrescriptionAddComponent,
    PrescriptionDetailsComponent,
    PrescriptionEditComponent,
    PrescriptionListComponent,
  ],
  imports: [PrescriptionRoutingModule,MaterialModule,CommonModule,FormsModule,ReactiveFormsModule],
})
export class PrescriptionModule {}
