import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LandingPageComponent } from './landing-page.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { FeaturesSectionComponent } from './features-section/features-section.component';
import { BlogComponent } from './blog/blog.component';
import { TrustedComponent } from './trusted/trusted.component';
import { StatisticsSectionComponent } from './statistics-section/statistics-section.component';
import { SpecialitiesSectionComponent } from './specialities-section/specialities-section.component';
import { ServicesSectionComponent } from './services-section/services-section.component';
import { TestimonialsSectionComponent } from './testimonials-section/testimonials-section.component';
import { DoctorsSectionComponent } from './doctors-section/doctors-section.component';
import { SubscribeSectionComponent } from './subscribe-section/subscribe-section.component';
import { RouterLink } from '@angular/router';
import { InfoSectionComponent } from './info-section/info-section.component';
import { GallerySectionComponent } from './gallery-se\ction/gallery-section.component';
@NgModule({
  imports: [
    FlexLayoutModule, RouterLink,
    MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatSliderModule, MatGridListModule, MatTabsModule, MatCardModule, BrowserAnimationsModule, CarouselModule,
  ],
  declarations: [LandingPageComponent, HeroSectionComponent, FeaturesSectionComponent, SpecialitiesSectionComponent, ServicesSectionComponent, TestimonialsSectionComponent, DoctorsSectionComponent, SubscribeSectionComponent, TrustedComponent, BlogComponent, StatisticsSectionComponent, InfoSectionComponent, GallerySectionComponent],

  exports: []
})
export class LandingPageModule { }
