import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {

  patient: any = null;
  profilePic: string = "";

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private location: Location
  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.patientService.getPatientById(id).pipe(
      map(response => response.data)).subscribe(data => {
      this.patient = data
      this.profilePic = "http://localhost:8080/" + this.patient.image
    });
  }
  goBack(): void {
    this.location.back();
  }

}
