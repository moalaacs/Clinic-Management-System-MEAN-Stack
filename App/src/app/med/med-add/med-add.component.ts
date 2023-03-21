import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MedicineService } from 'src/app/services/medicine.service';
import { Location } from '@angular/common';
import { Medicine } from 'src/app/class/medicine';
import { MyErrorStateMatcher } from 'src/app/class/ErrorStateMatcher';
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

  constructor(public medicineService: MedicineService, public router: Router, public location: Location, public fb: FormBuilder) {
    this.medicineForm = this.fb.group({
      _name: ['', [Validators.required, Validators.pattern("[a-zA-Z]{3,}")]],
      _productionDate: ['', [Validators.required, Validators.pattern("(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d")]],
      _expiryDate: ['', [Validators.required, Validators.pattern("(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d")]],
      _leaflet: ['', [Validators.required, Validators.pattern("[a-zA-Z]{3,}")]],
      _pricePerUnit: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      _quantity: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    });
    this.matcher = new MyErrorStateMatcher();
  }

  ngOnInit() {
    this.medicineService.getAllMedicine().subscribe(data => {
      this.medicine = data;
    })
  }
  get name() {
    return this.medicineForm.get('name');
  }
  get productionDate() {
    return this.medicineForm.get('productionDate');
  }
  get expiryDate() {
    return this.medicineForm.get('expiryDate');
  }
  get leaflet() {
    return this.medicineForm.get('leaflet');
  }
  get pricePerUnit() {
    return this.medicineForm.get('pricePerUnit');
  }
  get quantity() {
    return this.medicineForm.get('quantity');
  }
  addMedicine(errorH5: HTMLElement) {
    errorH5.innerHTML = '';
    let Router = this.router;
    this.medicineService.addMedicine(this.medicineForm.value).subscribe({
      next(value) {
        console.log(value);
        alert("Success");
        Router.navigateByUrl("medicine");
      },
      error(err) {
        errorH5.innerHTML = err.error.message;
      },
      // console.log(newMedicine);
      // // this.medicine.push(newMedicine);
      // this.router.navigateByUrl("/medicine");
      // this.location.back();

    });
  }
}
