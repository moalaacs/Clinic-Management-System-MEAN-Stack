import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MedicineService } from '../services/medicine.service';
import { Location } from '@angular/common';
import { Medicine } from '../models/medicine';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.css']
})
export class MedicineComponent implements OnInit {
  id: number = 0;
  _medicine: Medicine = new Medicine(10, "MedicineName", "10/10/2022", "10/6/2025", "Keep this leaflet. You may need to read it again", 50, 100);

  medicine: Medicine[] = [];

  constructor(public medicineService: MedicineService, public router: Router, public location: Location) {
  }
  sub: Subscription | null = null;

  ngOnInit() {
    this.medicineService.getAllMedicine().subscribe(data => {
      this.medicine = data;
    })
  }
  addMedicine(medicine: Medicine) {
    this.medicineService.addMedicine(medicine).subscribe(newMedicine => {
      this.medicine.push(newMedicine);
    });
  }
  updateMedicine() {
    this.medicineService.updateMedicine(this._medicine).subscribe(medicineUpdated => {
      const index = this.medicine.findIndex(medi => medi._id == medicineUpdated._id);
      if (index >= 0) {
        this.medicine[index] = medicineUpdated;
      }
    });
  }
  deleteMedicine(medicine: Medicine) {
    if (confirm('Are you sure you want to delete this medicine?!')) {
      this.medicineService.deleteMedicineById(medicine._id).subscribe(() => {
        const index = this.medicine.findIndex(medi => medi._id == medicine._id);
        if (index >= 0) {
          this.medicine.splice(index, 1);
        }
        this.location.back();
      });
    }
  }
}
