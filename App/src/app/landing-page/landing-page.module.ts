import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { LandingPageComponent } from './landing-page.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { FeaturesSectionComponent } from './features-section/features-section.component';
import { SpecialitiesSectionComponent } from './specialities-section/specialities-section.component';
import { ServicesSectionComponent } from './services-section/services-section.component';
import { TestimonialsSectionComponent } from './testimonials-section/testimonials-section.component';
import { DoctorsSectionComponent } from './doctors-section/doctors-section.component';
import { SubscribeSectionComponent } from './subscribe-section/subscribe-section.component';
import { FooterComponent } from './footer/footer.component';
import { RouterLink } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
@NgModule({
  imports: [MatTabsModule,
    BrowserModule, FlexLayoutModule, FormsModule,
    MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, RouterLink
  ],
  declarations: [LandingPageComponent, HeroSectionComponent, FeaturesSectionComponent, SpecialitiesSectionComponent, ServicesSectionComponent, TestimonialsSectionComponent, DoctorsSectionComponent, SubscribeSectionComponent, FooterComponent],
})
export class LandingPageModule { }
