import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from "./notfound/notfound.component"
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./landing-page/landing-page.module').then(m => m.LandingPageModule),
    pathMatch: 'full'
  },
  {
    path: 'clinic',
    loadChildren: () => import('./body/clinic/clinic.module').then(m => m.ClinicModule)
  }
];
@NgModule({
  declarations: [NotfoundComponent],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
