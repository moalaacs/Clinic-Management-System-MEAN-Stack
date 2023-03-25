import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppointRoutingModule } from './appointment-routing.module';
import { AppointListComponent } from './appoint-list/appoint-list.component';
import { AppointDetailsComponent } from './appoint-details/appoint-details.component';
import { AppointAddComponent } from './appoint-add/appoint-add.component';
import { MaterialModule } from 'src/app/shared/material.moudel';
@NgModule({
  declarations: [
    AppointListComponent,
    AppointDetailsComponent,
    AppointAddComponent
  ],
  imports: [
    CommonModule, MaterialModule,
    AppointRoutingModule, FormsModule,
    ReactiveFormsModule, RouterModule,
  ]
})
export class AppointModule { }
