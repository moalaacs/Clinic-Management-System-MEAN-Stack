import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';


import { PatientComponent } from './patient.component';

@NgModule({
  imports: [
    CommonModule,BrowserModule,RouterModule, MatToolbarModule, MatCardModule
  ],
  declarations: [PatientComponent]
})
export class PatientModule { }
