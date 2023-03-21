import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';

import { MedRoutingModule } from './med-routing.module';
import { MedAddComponent } from './med-add/med-add.component';
import { MedDetailsComponent } from './med-details/med-details.component';
import { MedListComponent } from './med-list/med-list.component';


@NgModule({
  declarations: [
    MedAddComponent,
    MedDetailsComponent,
    MedListComponent
  ],
  imports: [
    CommonModule,
    MedRoutingModule,
    ReactiveFormsModule, FormsModule, MatSlideToggleModule, MatCardModule,
    MatFormFieldModule, MatInputModule, MatSnackBarModule, MatDatepickerModule, MatButtonModule, MatRadioModule,
    MatToolbarModule, MatProgressBarModule, MatGridListModule, MatIconModule,
    MatListModule, MatExpansionModule, MatNativeDateModule, MatDialogModule,
    MatSelectModule, RouterModule
  ]
})
export class MedModule { }
