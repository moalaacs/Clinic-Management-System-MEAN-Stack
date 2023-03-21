import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './Auth/token-interceptor/token-interceptor.service'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageModule } from './landing-page/landing-page.module';
import { ClinicModule } from './clinic/clinic.module';
import { SpecilityToImagePipe } from './pipes/specility-to-image.pipe';
import { MedicineModule } from './medicine/medicine.module';
import { AppointmentModule } from './appointment/appointment.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MedicineDetailsComponent } from './medicine/medicine-details/medicine-details.component';
import { DashboardModule } from './Dashboard/Dashboard.module';
import { HeaderComponent } from './landing-page/header/header.component';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PrescriptionAddComponent } from './prescription/prescription-add/prescription-add.component';
import { PrescriptionDetailsComponent } from './prescription/prescription-details/prescription-details.component';
import { PrescriptionEditComponent } from './prescription/prescription-edit/prescription-edit.component';
import { PrescriptionListComponent } from './prescription/prescription-list/prescription-list.component';
import { PrescriptionModule } from './prescription/prescription.module';

@NgModule({
  declarations: [
    AppComponent,
    SpecilityToImagePipe, MedicineDetailsComponent, HeaderComponent, RegisterComponent, LoginComponent
  ],
  imports: [
    PrescriptionModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule, NgbModule,
    FormsModule, ReactiveFormsModule,
    LandingPageModule, FlexLayoutModule,
    ClinicModule, MedicineModule, AppointmentModule, MatSlideToggleModule, MatInputModule,
    MatCardModule, MatFormFieldModule, MatNativeDateModule, DatePipe, MatIconModule, ToastrModule.forRoot(),
    MatSnackBarModule, CommonModule
  ],
  providers: [NgbActiveModal, ToastrService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
