import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Medicine } from 'src/app/class/medicine';
import { MedicineService } from 'src/app/services/medicine.service';

@Component({
  selector: 'app-medicine-details',
  templateUrl: './medicine-details.component.html',
  styleUrls: ['./medicine-details.component.css']
})
export class MedicineDetailsComponent implements OnInit {
  medicine: Medicine = new Medicine(10, "MedicineName", "10/10/2022", "10/6/2025", "Keep this leaflet. You may need to read it again", 50, 100);

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