import { Component, OnInit } from '@angular/core';
import { ClinicService } from 'src/app/services/clinic.service';
@Component({
  selector: 'app-specilization',
  templateUrl: './specilization.component.html',
  styleUrls: ['./specilization.component.css']
})
export class SpecilizationComponent implements OnInit {
  availableSpecilization: string[];
  constructor(private clinicService: ClinicService) {
    this.availableSpecilization = [];
  }
  ngOnInit() {
    this.clinicService.getPublicAvailableSpecilization().subscribe((data) => this.availableSpecilization = data);
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
}
