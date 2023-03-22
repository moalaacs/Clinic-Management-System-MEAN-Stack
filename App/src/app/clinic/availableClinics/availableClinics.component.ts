import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IClinic } from 'src/app/models/IClinic';
import { ClinicService } from 'src/app/services/clinic.service';

@Component({
  selector: 'app-availableClinics',
  templateUrl: './availableClinics.component.html',
  styleUrls: ['./availableClinics.component.css']
})
export class AvailableClinicsComponent implements OnInit {
  clinics: IClinic[];
  constructor(private clinicService: ClinicService, private activeRoute: ActivatedRoute) {
    this.clinics = [];
  }
  ngOnInit() {
    this.clinicService.getClinicsBySpecilization(this.activeRoute.snapshot.params["speciallity"]).subscribe(data => {
      console.log(data);
      this.clinics = data;
    }
    );
  }

}
