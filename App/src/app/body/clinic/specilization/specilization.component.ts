import { Component,OnInit } from '@angular/core';
import { ClinicService } from 'src/app/service/clinic.service';
@Component({
  selector: 'app-specilization',
  templateUrl: './specilization.component.html',
  styleUrls: ['./specilization.component.css']
})
export class SpecilizationComponent implements OnInit {
  availableSpecilization:string[];
  constructor(private clinicService:ClinicService){
    this.availableSpecilization=[];
  }
  ngOnInit() {
      this.clinicService.getPublicAvailableSpecilization().subscribe((data) => this.availableSpecilization=data);
  }
}
