import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MedicineService } from 'src/app/services/medicine.service';
import { Location } from '@angular/common';
import { Medicine } from 'src/app/models/medicine';
import { MyErrorStateMatcher } from 'src/app/models/ErrorStateMatcher';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-med-add',
  templateUrl: './med-add.component.html',
  styleUrls: ['./med-add.component.css']
})
export class MedAddComponent implements OnInit {
  _medicine: Medicine = new Medicine(1000, "", "", "", "", 1000, 123);
  medicine: Medicine[] = [];
  medicineForm: FormGroup;
  matcher: MyErrorStateMatcher;
  minDate: Date;
  maxDate: Date;

  constructor(public medicineService: MedicineService, public router: Router, public location: Location, public fb: FormBuilder, public mat: MatSnackBar) {
    this.minDate = new Date('2010-01-01');
    this.maxDate = new Date('2030-12-31');
    this.medicineForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z\\s]+")]],
      production: ['', [Validators.required,]],
      expiry: ['', [Validators.required,]],
      leaflet: ['', [Validators.required, Validators.pattern("[a-zA-Z ,.]+")]],
      price: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      quantity: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    });
    this.matcher = new MyErrorStateMatcher();
  }

  ngOnInit() {
    this.medicineService.getAllMedicine().subscribe(data => {
      this.medicine = data;
    })
  }
  get name() {
    return this.medicineForm.get('_name');
  }
  get productionDate() {
    return this.medicineForm.get('_productionDate');
  }
  get expiryDate() {
    return this.medicineForm.get('_expiryDate');
  }
  get leaflet() {
    return this.medicineForm.get('_leaflet');
  }
  get pricePerUnit() {
    return this.medicineForm.get('_pricePerUnit');
  }
  get quantity() {
    return this.medicineForm.get('_quantity');
  }
  onSubmit() {
    const date = new Date(this.medicineForm.value.production);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    const formattedDate = `${day}/${month}/${year}`;
    this.medicineForm.value.production = formattedDate;
    const datee = new Date(this.medicineForm.value.expiry);
    const dayy = datee.getDate().toString().padStart(2, '0');
    const monthh = (datee.getMonth() + 1).toString().padStart(2, '0');
    const yearr = datee.getFullYear().toString();
    const formattedDatee = `${dayy}/${monthh}/${yearr}`;
    this.medicineForm.value.expiry = formattedDatee;

    this.medicineService.addMedicine(this.medicineForm.value).subscribe(
      () => {
        this.router.navigate(['/medicine'])
      }, error => {
        this.mat.open(error.error.message, "", { duration: 3000 });
      })
  }
}
