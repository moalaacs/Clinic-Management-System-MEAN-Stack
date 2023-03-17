import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';




import { LandingPageRoutingModule } from './landing-page-routing.module';

import { LandingPageComponent } from './landing-page.component';
import { HeaderComponent } from './header/header.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { FeaturesSectionComponent } from './features-section/features-section.component';
import { SpecialitiesSectionComponent } from './specialities-section/specialities-section.component';
import { ServicesSectionComponent } from './services-section/services-section.component';
import { TestimonialsSectionComponent } from './testimonials-section/testimonials-section.component';
import { DoctorsSectionComponent } from './doctors-section/doctors-section.component';
import { SubscribeSectionComponent } from './subscribe-section/subscribe-section.component';
import { BlogSectionComponent } from './blog-section/blog-section.component';
import { BrandPartnersSectionComponent } from './brand-partners-section/brand-partners-section.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule, FlexLayoutModule,
    LandingPageRoutingModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule
  ],
  declarations: [LandingPageComponent, HeaderComponent, HeroSectionComponent, FeaturesSectionComponent, SpecialitiesSectionComponent, ServicesSectionComponent, TestimonialsSectionComponent, DoctorsSectionComponent, SubscribeSectionComponent, BlogSectionComponent, BrandPartnersSectionComponent, FooterComponent],

  exports: [LandingPageComponent]
})
export class LandingPageModule { }
