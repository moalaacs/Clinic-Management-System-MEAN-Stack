import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
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
import { PatientRoutingModule } from './patient-routing.module';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { PatientAddComponent } from './patient-add/patient-add.component';
import { PatientEditComponent } from './patient-edit/patient-edit.component';
@NgModule({
  declarations: [
    PatientListComponent,
    PatientDetailsComponent,
    PatientAddComponent,
    PatientEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule, PatientRoutingModule,
    MatCardModule, MatFormFieldModule, MatInputModule, MatRadioModule,
    ReactiveFormsModule, MatSnackBarModule, MatDatepickerModule, MatButtonModule,
    MatToolbarModule, MatProgressBarModule, MatGridListModule, MatIconModule, MatListModule
    , MatExpansionModule, MatNativeDateModule, MatDialogModule
  ]
})


export class PatientModule { }
