import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MedicineService } from 'src/app/service/medicine.service';
import { Location } from '@angular/common';
import { Medicine } from 'src/app/class/medicine';

@Component({
  selector: 'app-medicine-add',
  templateUrl: './medicine-add.component.html',
  styleUrls: ['./medicine-add.component.css']
})
export class MedicineAddComponent implements OnInit {

  _medicine: Medicine = new Medicine(1000, "", "", "", "", 1000, 123);
  medicine: Medicine[] = [];
  medicineForm: FormGroup;

  constructor(public medicineService: MedicineService, public router: Router, public location: Location, public fb: FormBuilder) {
    this.medicineForm = this.fb.group({
      _name: ['', [Validators.required]],
      _productionDate: ['', [Validators.required, Validators.pattern("^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$")]],
      _expiryDate: ['', [Validators.required, Validators.pattern("^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$")]],
      _leaflet: ['', [Validators.required, Validators.pattern("[a-zA-Z]{3,}")]],
      _pricePerUnit: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      _quantity: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],

      // production:  "";
      // expiry: string = "";
      // price: number = 0;
      // quantity: number = 0;
      // leaflet: string = "";
    });
  }

  ngOnInit() {
    this.medicineService.getAllMedicine().subscribe(data => {
      this.medicine = data;
    })
  }
  addMedicine() {
    this.medicineService.addMedicine(this._medicine).subscribe(newMedicine => {
      console.log(newMedicine);
      // this.medicine.push(newMedicine);
      this.router.navigateByUrl("/medicine");
      this.location.back();

    });
  }

}
