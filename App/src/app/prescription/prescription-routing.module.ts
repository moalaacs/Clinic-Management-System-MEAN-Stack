import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrescriptionAddComponent } from './prescription-add/prescription-add.component';
import { PrescriptionDetailsComponent } from './prescription-details/prescription-details.component';
import { PrescriptionEditComponent } from './prescription-edit/prescription-edit.component';
import { PrescriptionListComponent } from './prescription-list/prescription-list.component';
//import { AuthGuard } from '../Auth/guard/auth.guard';

const routes: Routes = [
  { path: '', component: PrescriptionListComponent},
  { path: 'details/:id', component: PrescriptionDetailsComponent  },
  { path: 'edit/:id', component: PrescriptionEditComponent},
  { path: 'add', component: PrescriptionAddComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrescriptionRoutingModule { }
