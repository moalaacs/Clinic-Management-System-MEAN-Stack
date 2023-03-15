import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrescriptionService } from '../services/prescription.service';
import { Location } from '@angular/common';
import { Prescription } from '../models/prescription';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent implements OnInit {
  id: number = 0;
  _prescription: Prescription = new Prescription(20000, 100, 1000, 10, "Instructions", "Date");

  prescription: Prescription[] = [];

  constructor(public prescriptionService: PrescriptionService, public router: Router, public location: Location) {
  }
  sub: Subscription | null = null;

  ngOnInit() {
    this.prescriptionService.getAllPrescription().subscribe(data => {
      this.prescription = data;
    })
  }
  addPrescription(prescription: Prescription) {
    this.prescriptionService.addPrescription(prescription).subscribe(newPrescription => {
      this.prescription.push(newPrescription);
    });
  }
  updatePrescription() {
    this.prescriptionService.updatePrescription(this._prescription).subscribe(prescriptionUpdated => {
      const index = this.prescription.findIndex(presc => presc._id == prescriptionUpdated._id);
      if (index >= 0) {
        this.prescription[index] = prescriptionUpdated;
      }
    });
  }
  deletePrescription(prescription: Prescription) {
    if (confirm('Are you sure you want to delete this prescription?!')) {
      this.prescriptionService.deletePrescriptionById(prescription._id).subscribe(() => {
        const index = this.prescription.findIndex(presc => presc._id == prescription._id);
        if (index >= 0) {
          this.prescription.splice(index, 1);
        }
        this.location.back();
      });
    }
  }
}
