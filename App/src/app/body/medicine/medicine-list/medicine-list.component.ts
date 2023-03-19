import { Component } from '@angular/core';
import { Medicine } from 'src/app/class/medicine';
import { MedicineService } from 'src/app/service/medicine.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.css']
})
export class MedicineListComponent {
  medicine: Medicine[] = [];
  constructor(public medicineService: MedicineService, public router: Router, public location: Location) {

  }
  ngOnInit() {
    this.medicineService.getAllMedicine().subscribe(data => {
      this.medicine = data;
    })
  }


}
