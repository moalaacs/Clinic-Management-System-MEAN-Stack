import { Component, OnInit } from '@angular/core';

import { Patient } from '../models/patient';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  patients: Patient[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getAllPatients().subscribe(patients => {
      this.patients = patients;
    });
  }

  addPatient(patient: Patient, photo: File) {
    this.apiService.addPatient(patient, photo).subscribe(newPatient => {
      this.patients.push(newPatient);
    });
  }

  updatePatient(patient: Patient, photo: File) {
    this.apiService.putPatientById(patient.id, patient, photo).subscribe(updatedPatient => {
      const index = this.patients.findIndex(p => p.id === updatedPatient.id);
      if (index >= 0) {
        this.patients[index] = updatedPatient;
      }
    });
  }

  deletePatient(patient: Patient) {
    this.apiService.removePatientById(patient.id).subscribe(() => {
      const index = this.patients.findIndex(p => p.id === patient.id);
      if (index >= 0) {
        this.patients.splice(index, 1);
      }
    });
  }
}
