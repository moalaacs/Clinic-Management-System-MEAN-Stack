import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageModule } from './landing-page/landing-page.module';
import { SpecilizationComponent } from './body/clinic/specilization/specilization.component';
import { ServicesComponent } from './body/clinic/services/services.component';
import { ClinicsInfoComponent } from './body/clinic/clinics-info/clinics-info.component';
import { ClinicsInfoByIdComponent } from './body/clinic/clinics-info-by-id/clinics-info-by-id.component';


@NgModule({
  declarations: [
    AppComponent,
    SpecilizationComponent,
    ServicesComponent,
    ClinicsInfoComponent,
    ClinicsInfoByIdComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,NgbModule,
    FormsModule,ReactiveFormsModule,
    LandingPageModule, FlexLayoutModule
  ],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
