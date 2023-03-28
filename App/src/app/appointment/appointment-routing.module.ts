import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointAddComponent } from './appoint-add/appoint-add.component';
import { AppointDetailsComponent } from './appoint-details/appoint-details.component';
import { AppointListComponent } from './appoint-list/appoint-list.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AppointEditComponent } from './appoint-edit/appoint-edit.component';
import { AuthGuard } from '../Auth/guard/auth.guard';

const routes: Routes = [
  { path: "", component: AppointListComponent ,canActivate:[AuthGuard]},
  { path: "add", component: AppointAddComponent ,canActivate:[AuthGuard]},
  { path: "details/:id", component: AppointDetailsComponent ,canActivate:[AuthGuard]},
  { path: 'edit/:id', component: AppointEditComponent ,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes), MatInputModule, MatSelectModule, MatSlideToggleModule],
  exports: [RouterModule, MatInputModule, MatSelectModule, MatSlideToggleModule]
})
export class AppointRoutingModule { }
