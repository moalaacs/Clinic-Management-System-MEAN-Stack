import { Component, OnInit } from '@angular/core';
import { ClinicService } from 'src/app/services/clinic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { clinic } from 'src/app/models/clinic';
@Component({
  selector: 'app-clinic-details',
  templateUrl: './clinic-details.component.html',
  styleUrls: ['./clinic-details.component.css']
})
export class ClinicsInfoByIdComponent implements OnInit {
  clinic: clinic;
  constructor(private clinicService: ClinicService, private rotue: ActivatedRoute, private router: Router) {
    this.clinic = { _id: 0, _contactNumber: "", _address: { street: "", city: "", country: "", zipCode: 0 }, _weeklySchedule: [], _doctors: [], _specilization: "" };
  }
  ngOnInit() {
    this.clinicService.getPublicClinicInfoById(this.rotue.snapshot.params["id"]).subscribe(data => this.clinic = data);
  }
  goBack(): void {
    this.router.navigate(['/clinic']);
  }
}
