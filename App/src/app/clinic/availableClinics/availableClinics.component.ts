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
