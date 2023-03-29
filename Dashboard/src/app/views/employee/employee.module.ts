import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { MaterialModule } from '../shared/material.moduel';
import { BadgeModule, CardModule, GridModule } from '@coreui/angular';

@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeDetailsComponent,
    EmployeeEditComponent,
    EmployeeAddComponent
  ],
  imports: [
    CommonModule,
    FormsModule, EmployeeRoutingModule,
    ReactiveFormsModule, MaterialModule,
    BadgeModule, CardModule, GridModule
  ]
})
export class EmployeeModule { }
