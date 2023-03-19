import { Component, OnInit } from '@angular/core';
import { ClinicService } from 'src/app/services/clinic.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-clinics-info',
  templateUrl: './clinics-info.component.html',
  styleUrls: ['./clinics-info.component.css']
})
export class ClinicsInfoComponent implements OnInit {
  clinics: { _contactNumber: string, _address: { street: string, city: string, country: string, zipCode: number }, _weeklySchedule: { day: string, start: string, end: string }[] }[];
  speciallity: string;
  constructor(private clinicService: ClinicService, private rotue: ActivatedRoute) {
    this.clinics = [];
    this.speciallity = this.rotue.snapshot.params["speciallity"];
  }
  ngOnInit() {
    this.clinicService.getPublicClinicsBySpeciality(this.speciallity).subscribe(data => this.clinics = data);
  }
}
