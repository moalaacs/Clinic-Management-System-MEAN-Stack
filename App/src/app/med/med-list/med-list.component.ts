import { Component } from '@angular/core';
import { Medicine } from 'src/app/class/medicine';
import { MedicineService } from 'src/app/services/medicine.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-med-list',
  templateUrl: './med-list.component.html',
  styleUrls: ['./med-list.component.css']
})
export class MedListComponent {
  medicine: Medicine[] = [];
  constructor(public medicineService: MedicineService, public router: Router, public location: Location) {

  }
  ngOnInit() {
    this.medicineService.getAllMedicine().subscribe(data => {
      this.medicine = data;
    })
  }


}
