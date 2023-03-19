import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Location } from '@angular/common';
import { Medicine } from 'src/app/models/medicine';
import { MedicineService } from 'src/app/services/medicine.service';

@Component({
  selector: 'app-medicine-add',
  templateUrl: './medicine-add.component.html',
  styleUrls: ['./medicine-add.component.css']
})
export class MedicineAddComponent implements OnInit {

  _medicine: Medicine = new Medicine(1000, "", "", "", "", 1000, 123);
  medicine: Medicine[] = [];
  constructor(public medicineService: MedicineService, public router: Router, public location: Location, public fb: FormBuilder) {
  }

  ngOnInit() {
    this.medicineService.getAllMedicine().subscribe(data => {
      this.medicine = data;
    })
  }
  addMedicine() {
    this.medicineService.addMedicine(this._medicine).subscribe(newMedicine => {
      this.medicine.push(newMedicine);
    });
  }

}
