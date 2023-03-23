import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointAddComponent } from './appoint-add/appoint-add.component';
import { AppointDetailsComponent } from './appoint-details/appoint-details.component';
import { AppointListComponent } from './appoint-list/appoint-list.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

const routes: Routes = [
  { path: "", component: AppointListComponent },
  { path: "add", component: AppointAddComponent },
  { path: "details/:id", component: AppointDetailsComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes), MatInputModule, MatSelectModule, MatSlideToggleModule],
  exports: [RouterModule, MatInputModule, MatSelectModule, MatSlideToggleModule]
})
export class AppointRoutingModule { }
