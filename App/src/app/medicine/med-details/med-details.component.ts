import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Medicine } from 'src/app/models/medicine';
import { MedicineService } from 'src/app/services/medicine.service';

@Component({
  selector: 'app-med-details',
  templateUrl: './med-details.component.html',
  styleUrls: ['./med-details.component.css']
})
export class MedDetailsComponent implements OnInit {
  medicine: Medicine = new Medicine(10, "Medicine Name", "06/05/2022", "06/05/2025", "This medicine has been prescribed for you. Do not pass it on to others. It may harm them, even if their symptoms are the same as yours. If any of the side effects gets serious, or if you notice any side effects not listed in this leaflet, please tell your doctor or pharmacist.", 50, 100);

  constructor(public medicineService: MedicineService, public activatedRoute: ActivatedRoute, public router: Router) {
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
  back() {
    this.router.navigateByUrl('/medicine');
  }
}
