import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AuthGuard } from './../Auth/guard/auth.guard';

const routes: Routes = [
{ path: '', component: EmployeeListComponent },
{ path: 'details/:id', component: EmployeeDetailsComponent },
{ path: 'edit/:id', component: EmployeeEditComponent,canActivate:[AuthGuard] },
{ path: 'add', component: EmployeeAddComponent,canActivate:[AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
