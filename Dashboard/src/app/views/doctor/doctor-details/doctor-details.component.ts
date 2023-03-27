import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

import { Schedule } from '../../../models/doctor';
import { DoctorService } from '../../../services/doctor.service';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css']
})
export class DoctorDetailsComponent implements OnInit {

  doctor: any;
  schedule: Schedule[] = [];
  profilePic: string = "";

  constructor(
    private doctorService: DoctorService,
    private route: ActivatedRoute,
    private location: Location
  ) { }



  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.doctorService.getDoctorById(id).pipe(
      map(response => response.data)).subscribe(data => {
        this.doctor = data;
        this.profilePic = "http://localhost:8080/" + this.doctor.image;
        this.schedule = data.schedule;
      });
  }
  goBack(): void {
    this.location.back();
  }

}
