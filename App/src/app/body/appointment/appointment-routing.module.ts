import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentAddComponent } from './appointment-add/appointment-add.component';
import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';

const routes: Routes = [
  { path: "", component: AppointmentListComponent },
  { path: "addz", component: AppointmentAddComponent },
  { path: "detailsz/:id", component: AppointmentDetailsComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }
