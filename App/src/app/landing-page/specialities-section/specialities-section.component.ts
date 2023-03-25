import { Component, OnInit } from '@angular/core';
import { clinic } from 'src/app/models/clinic';
import { ClinicService } from 'src/app/services/clinic.service';
@Component({
  selector: 'app-specialities-section',
  templateUrl: './specialities-section.component.html',
  styleUrls: ['./specialities-section.component.css']
})
export class SpecialitiesSectionComponent implements OnInit {
  clinics: clinic[];
  shownClinic: any;
  constructor(private clinicService: ClinicService) {
    this.shownClinic = null;
    this.clinics = [];
  }
  ngOnInit() {
    this.clinicService.getClinics().subscribe(data => {
      this.clinics = [...new Map(data.map(item =>
        [item["_specilization"], item])).values()];
      this.shownClinic = this.clinics[0];
    });
  }
  spToImg(value: string): string {
    switch (value) {
      case "Surgical": return "knife"
      case "Pediatrics": return "infant"
      case "Women's Health": return "women"
      case "Cardiology": return "healthy-heart"
      case "Neurology": return "brain"
      case "Dental": return "tooth"
      case "Physical Therapy": return "exercise"
      case "Radiologic": return "x-ray"
      case "Dermatology": return "spots"
      default: return ""
    }
  }
  changeActiveDiv(id: number) {
    let found = this.clinics.find(element => element._id = id);
    if (found)
      this.shownClinic = found;
  }
}
