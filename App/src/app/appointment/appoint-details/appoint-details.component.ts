import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Location } from '@angular/common';
import { Appointment } from 'src/app/models/appointment';

@Component({
  selector: 'app-appoint-details',
  templateUrl: './appoint-details.component.html',
  styleUrls: ['./appoint-details.component.css']
})
export class AppointDetailsComponent implements OnInit {
  _appointment: Appointment = new Appointment("", 1, 10000, "patient", 100, "", "", "");
  appointment: Appointment[] = [];
  constructor(public appointmentService: AppointmentService, public router: Router, public location: Location, public activatedRoute: ActivatedRoute) {
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe(p => {
      this.appointmentService.getAppointmentById(p['id']).subscribe(data => {
        this._appointment = data[0];
        // alert(JSON.stringify(this.medicine));
        console.log(data);
        console.log(this._appointment);

      })
    })
  }
}

