import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../Auth/guard/auth.guard';

import { InvoiceAddComponent } from './invoice-add/invoice-add.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceEditComponent } from './invoice-edit/invoice-edit.component';

const routes: Routes = [
  { path: '', component: InvoiceListComponent,canActivate:[AuthGuard]},
  { path: 'details/:id', component: InvoiceDetailsComponent ,canActivate:[AuthGuard] },
  { path: 'edit/:id', component: InvoiceEditComponent,canActivate:[AuthGuard]},
  { path: 'add', component: InvoiceAddComponent,canActivate:[AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
