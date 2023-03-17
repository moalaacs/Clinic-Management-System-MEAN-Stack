import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageModule } from './landing-page/landing-page.module';
import { SignInComponent } from './signIn/signIn.component';
import { PatientModule } from './patient/patient.module';



@NgModule({
  declarations: [
    AppComponent,
      SignInComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,NgbModule,
    FormsModule,ReactiveFormsModule,
    LandingPageModule, FlexLayoutModule,PatientModule,
    MatSlideToggleModule,MatCardModule,MatFormFieldModule,MatInputModule,MatNativeDateModule,
    MatIconModule
  ],
  providers: [NgbActiveModal,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
