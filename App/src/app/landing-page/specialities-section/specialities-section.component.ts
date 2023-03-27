import { Component, OnInit } from '@angular/core';
import { clinic } from 'src/app/models/clinic';
import { ClinicService } from 'src/app/services/clinic.service';
@Component({
  selector: 'app-specialities-section',
  templateUrl: './specialities-section.component.html',
  styleUrls: ['./specialities-section.component.css']
})
export class SpecialitiesSectionComponent implements OnInit {
  clinics: string[];
  shownClinic: any;
  photoArray: number[];
  constructor(private clinicService: ClinicService) {
    this.photoArray = [4, 5, 2, 6];
    this.shownClinic = null;
    this.clinics = [];
  }
  ngOnInit() {
    this.clinicService.getPublicAvailableSpecilization().subscribe(data => {
      this.clinics = data;
      this.shownClinic = this.clinics[0];
    });
  }
}
