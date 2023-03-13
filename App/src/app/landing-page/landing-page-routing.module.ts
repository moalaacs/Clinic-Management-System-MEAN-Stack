import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    children: [
      { path: '',
      redirectTo: 'header',
      pathMatch: 'full'
      },
      { path: 'header', component: HeaderComponent },
      { path: 'hero', component: HeroSectionComponent },
      { path: 'features', component: FeaturesSectionComponent },
      { path: 'specialities', component: SpecialitiesSectionComponent },
      { path: 'services', component: ServicesSectionComponent },
      { path: 'testimonials', component: TestimonialsSectionComponent },
      { path: 'doctors', component: DoctorsSectionComponent },
      { path: 'subscribe', component: SubscribeSectionComponent },
      { path: 'blog', component: BlogSectionComponent },
      { path: 'partners', component: BrandPartnersSectionComponent },
      { path: 'footer', component: FooterComponent }
      ]
      }
      ];

      @NgModule({
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
      })
      export class LandingPageRoutingModule { }
