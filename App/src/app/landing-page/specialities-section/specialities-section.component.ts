import { Component, OnInit } from '@angular/core';
import { IClinic } from 'src/app/models/IClinic';
import { ClinicService } from 'src/app/services/clinic.service';

@Component({
  selector: 'app-specialities-section',
  templateUrl: './specialities-section.component.html',
  styleUrls: ['./specialities-section.component.css']
})
export class SpecialitiesSectionComponent implements OnInit {
  clinics: IClinic[];
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
  spToDescription(value: string): string {
    switch (value) {
      case "Surgical": return "Provides diagnostic and therapeutic surgical services to patients. It is staffed by a team of highly skilled and trained healthcare professionals, including surgeons, anesthesiologists, surgical nurses, and surgical technicians."
      case "Pediatrics": return "Focuses on the healthcare needs of children, from newborns to adolescents. It is staffed by pediatricians, pediatric nurses, and other healthcare professionals who are trained to care for the unique physical, emotional, and developmental needs of children."
      case "Women's Health": return "Focuses on the health and wellbeing of women. It provides a wide range of services, including routine gynecological exams, prenatal care, family planning, and treatment for reproductive health conditions."
      case "Cardiology": return "Diagnosis and treatment of heart and cardiovascular diseases. It is staffed by cardiologists, cardiac nurses, and other healthcare professionals who use a variety of diagnostic tests and treatments to manage heart disease."
      case "Neurology": return "Diagnosis and treatment of disorders of the nervous system, including the brain, spinal cord, and nerves. It is staffed by neurologists, neurosurgeons, and other healthcare professionals who use a variety of diagnostic tests and treatments to manage neurological conditions."
      case "Dental": return "Diagnosis and treatment of dental and oral health problems. It is staffed by dentists, dental hygienists, and other healthcare professionals who provide a wide range of dental services, including routine cleanings, fillings, and oral surgeries."
      case "Physical Therapy": return "Specializes in the rehabilitation and management of musculoskeletal and neurological conditions. It is staffed by physical therapists, physical therapy assistants, and other healthcare professionals who use a variety of therapeutic techniques to manage pain, improve mobility, and promote healing."
      case "Radiologic": return "Specializes in the diagnosis and treatment of diseases and injuries using medical imaging technologies, such as X-rays, CT scans, and MRI scans. It is staffed by radiologists, radiologic technologists, and other healthcare professionals who use these imaging technologies to diagnose and treat a wide range of medical conditions."
      case "Dermatology": return "Specializes in the diagnosis and treatment of skin, hair, and nail conditions. It is staffed by dermatologists, dermatologic nurses, and other healthcare professionals who use a variety of diagnostic tests and treatments to manage dermatologic conditions."
      default: return ""
    }
  }
}
