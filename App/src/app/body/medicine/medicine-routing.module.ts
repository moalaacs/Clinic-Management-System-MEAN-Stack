import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicineAddComponent } from './medicine-add/medicine-add.component';
import { MedicineDetailsComponent } from './medicine-details/medicine-details.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MedicineListComponent } from './medicine-list/medicine-list.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

const routes: Routes = [
  { path: "zz", component: MedicineListComponent },
  { path: "addz", component: MedicineAddComponent },
  { path: "detailsz/:id", component: MedicineDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes), MatInputModule, MatSelectModule, MatSlideToggleModule],
  exports: [RouterModule, MatInputModule, MatSelectModule, MatSlideToggleModule]
})
export class MedicineRoutingModule { }
