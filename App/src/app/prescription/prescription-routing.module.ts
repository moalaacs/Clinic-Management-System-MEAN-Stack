import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../Auth/guard/auth.guard';

import { PrescriptionAddComponent } from './prescription-add/prescription-add.component';
import { PrescriptionDetailsComponent } from './prescription-details/prescription-details.component';
import { PrescriptionEditComponent } from './prescription-edit/prescription-edit.component';
import { PrescriptionListComponent } from './prescription-list/prescription-list.component';

const routes: Routes = [
  { path: '', component: PrescriptionListComponent,canActivate:[AuthGuard]},
  { path: 'details/:id', component: PrescriptionDetailsComponent ,canActivate:[AuthGuard] },
  { path: 'edit/:id', component: PrescriptionEditComponent,canActivate:[AuthGuard]},
  { path: 'add', component: PrescriptionAddComponent,canActivate:[AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrescriptionRoutingModule { }
