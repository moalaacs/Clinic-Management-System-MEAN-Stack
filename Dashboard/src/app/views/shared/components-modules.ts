import { NgModule } from "@angular/core";
import { ClinicModule } from "../clinic/clinic.module";
import { LandingPageModule } from "../landing-page/landing-page.module";
import { AppointModule } from "../appointment/appointment.module";
import { MedModule } from "../medicine/medicine.module";
import { PrescriptionModule } from "../prescription/prescription.module";
@NgModule({
  exports: [
    ClinicModule,
    LandingPageModule,
    AppointModule,
  ]
})
export class ComponentsModule { }
