import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MedRoutingModule } from './medicine-routing.module';
import { MedAddComponent } from './med-add/med-add.component';
import { MedDetailsComponent } from './med-details/med-details.component';
import { MedListComponent } from './med-list/med-list.component';
import { MaterialModule } from 'src/app/shared/material.moduel';


@NgModule({
  declarations: [
    MedAddComponent,
    MedDetailsComponent,
    MedListComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    MedRoutingModule,
    ReactiveFormsModule,
    FormsModule, RouterModule
  ]
})
export class MedModule { }
