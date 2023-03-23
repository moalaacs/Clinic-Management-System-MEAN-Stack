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

import { AppointRoutingModule } from './appointment-routing.module';
import { AppointListComponent } from './appoint-list/appoint-list.component';
import { AppointDetailsComponent } from './appoint-details/appoint-details.component';
import { AppointAddComponent } from './appoint-add/appoint-add.component';


@NgModule({
  declarations: [
    AppointListComponent,
    AppointDetailsComponent,
    AppointAddComponent
  ],
  imports: [
    CommonModule,
    AppointRoutingModule, FormsModule, ReactiveFormsModule, RouterModule,
    MatSelectModule, MatDialogModule, MatNativeDateModule, MatExpansionModule,
    MatListModule, MatIconModule, MatGridListModule, MatProgressBarModule, MatToolbarModule,
    MatRadioModule, MatButtonModule, MatDatepickerModule, MatSnackBarModule,
    MatInputModule, MatFormFieldModule, MatCardModule, MatSlideToggleModule

  ]
})
export class AppointModule { }
