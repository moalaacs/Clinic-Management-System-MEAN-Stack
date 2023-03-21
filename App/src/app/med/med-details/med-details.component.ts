import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Medicine } from 'src/app/class/medicine';
import { MedicineService } from 'src/app/services/medicine.service';

@Component({
  selector: 'app-med-details',
  templateUrl: './med-details.component.html',
  styleUrls: ['./med-details.component.css']
})
export class MedDetailsComponent implements OnInit {
  medicine: Medicine = new Medicine(10, "", "", "", "", 50, 100);

  constructor(public medicineService: MedicineService, public activatedRoute: ActivatedRoute) {
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe(p => {
      this.medicineService.getMedicineById(p['id']).subscribe(data => {
        this.medicine = data[0];
        // alert(JSON.stringify(this.medicine));
        console.log(data);
        console.log(this.medicine);

      })
    })
  }
}
