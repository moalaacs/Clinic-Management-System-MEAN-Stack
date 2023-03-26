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
  spToDescription(value: string): string {
    switch (value) {
      case "Surgical": return "Diagnostic and therapeutic surgical services to patients"
      case "Pediatrics": return "Healthcare needs of children, from newborns to adolescents"
      case "Women's Health": return "Routine gynecological exams, prenatal care, family planning, and treatment for reproductive health conditions."
      case "Cardiology": return "Heart and cardiovascular diseases"
      case "Neurology": return "Disorders of the nervous system, including the brain, spinal cord, and nerves"
      case "Dental": return "Dental and oral health problems"
      case "Physical Therapy": return "Rehabilitation and management of musculoskeletal and neurological conditions"
      case "Radiologic": return "Treatment of diseases and injuries using medical imaging technologies, such as X-rays, CT scans, and MRI scans"
      case "Dermatology": return "Diagnosis and treatment of skin, hair, and nail conditions. It is staffed by dermatologists, dermatologic nurses, and other healthcare professionals who use a variety of diagnostic tests and treatments to manage dermatologic conditions."
      default: return ""
    }
  }
}
