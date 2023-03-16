import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicesComponent } from './body/clinic/services/services.component';
import { ClinicsInfoComponent } from './body/clinic/clinics-info/clinics-info.component';
import { ClinicsInfoByIdComponent } from './body/clinic/clinics-info-by-id/clinics-info-by-id.component';
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./landing-page/landing-page.module').then(m => m.LandingPageModule),
    pathMatch:'full'
  },

  {
    path:'specilization/:speciallity',
    component:ClinicsInfoComponent,
    children:[
      {
        path:'services',
        component:ServicesComponent
      },
      {
        path:':id',
        component:ClinicsInfoByIdComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
