import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ClinicRoutingModule } from './clinic-routing.module';
import { ServicesComponent } from './clinic-services/clinic-services.component';
import { ClinicsInfoComponent } from './clinic-list/clinics-list.component';
import { ClinicsInfoByIdComponent } from './clinic-details/clinic-details.component';
import { AddClinicComponent } from './add-clinic/add-clinic.component';
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
import { AvailableClinicsComponent } from './availableClinics/availableClinics.component';
import { WidgetsModule } from '../widgets/widgets.module';
import { BadgeModule, CardModule, GridModule } from '@coreui/angular';

@NgModule({
  declarations: [AvailableClinicsComponent,
    ServicesComponent, ClinicsInfoComponent, ClinicsInfoByIdComponent, AddClinicComponent
  ],
  imports: [
    CommonModule,
    ClinicRoutingModule,
    MatCardModule, MatFormFieldModule, MatInputModule, MatRadioModule,
    ReactiveFormsModule, MatSnackBarModule, MatDatepickerModule, MatButtonModule,
    MatToolbarModule, MatProgressBarModule, MatGridListModule, MatIconModule, MatListModule
    , MatExpansionModule, MatNativeDateModule, MatDialogModule, WidgetsModule,
    BadgeModule, CardModule, GridModule
  ],
})
export class ClinicModule { }
