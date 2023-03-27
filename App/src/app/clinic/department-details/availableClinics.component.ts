import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { clinic } from 'src/app/models/clinic';
import { ClinicService } from 'src/app/services/clinic.service';

@Component({
  selector: 'app-availableClinics',
  templateUrl: './availableClinics.component.html',
  styleUrls: ['./availableClinics.component.css']
})
export class AvailableClinicsComponent implements OnInit {
  clinics: clinic[];
  services: {
    name: string;
    cost: number;
  }[];
  specility: string;
  constructor(private clinicService: ClinicService, private activeRoute: ActivatedRoute) {
    this.clinics = [];
    this.services = [];
    this.specility = "";
  }
  ngOnInit() {
    this.specility = this.activeRoute.snapshot.params["speciallity"];
    this.clinicService.getClinicsBySpecilization(this.specility).subscribe(data => {
      this.clinics = data;
    });
    this.clinicService.getPublicServicesBySpeciality(this.specility).subscribe(data => this.services = data);
  }

}
