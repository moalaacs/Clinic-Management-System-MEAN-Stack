import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./landing-page/landing-page.module').then(m => m.LandingPageModule),
    pathMatch: 'full'
  },
  {
    path: 'clinic',
    loadChildren: () => import('./body/clinic/clinic.module').then(m => m.ClinicModule)
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
