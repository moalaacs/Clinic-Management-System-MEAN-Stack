import { NgModule } from "@angular/core";
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { ImageModule } from 'primeng/image';
import { CardModule } from 'primeng/card';

@NgModule({
  exports: [
    ChartModule,
    ButtonModule,
    ToastModule,
    RippleModule,
    ImageModule,
    CardModule
  ]
})
export class PrimeNgModule { }
