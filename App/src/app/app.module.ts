import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TokenInterceptorService } from './Auth/token-interceptor/token-interceptor.service'
// App Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AllAppointmentReportsComponent } from './appointment-reports/all-appointment-reports/all-appointment-reports.component';
import { SpecilizationComponent } from './clinic/specilization/specilization.component';

import { DashboardModule } from './Dashboard/Dashboard.module';
import { ToastrModule, ToastrService } from 'ngx-toastr';
// Imported Modules
import { AngularModules } from './shared/angular-modules';
import { MaterialModule } from './shared/material.moudel';
import { PrimeNgModule } from './shared/prime-ng-modules';
import { ComponentsModule } from './shared/components-modules';
@NgModule({
  declarations: [
    AllAppointmentReportsComponent,
    AppComponent, SpecilizationComponent,
    RegisterComponent, LoginComponent, HeaderComponent,
    ProfileComponent, FooterComponent, ContactUsComponent
  ],
  imports: [
    AngularModules,
    MaterialModule,
    PrimeNgModule,
    AppRoutingModule,
    NgbModule,
    ComponentsModule,
    DatePipe,
    ToastrModule.forRoot(),
    DashboardModule,
  ],
  providers: [NgbActiveModal, ToastrService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
