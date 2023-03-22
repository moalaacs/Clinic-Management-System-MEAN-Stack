import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { AppointmentReportsRoutingModule } from './appointment-reports-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    AppRoutingModule,
    ReactiveFormsModule,
    AppointmentReportsRoutingModule
  ]
})
export class AppointmentReportsModule { }
