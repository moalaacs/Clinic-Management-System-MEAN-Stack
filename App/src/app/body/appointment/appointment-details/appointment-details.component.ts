import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AppointmentService } from 'src/app/service/appointment.service';
import { Location } from '@angular/common';
import { Appointment } from 'src/app/class/appointment';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.css']
})
export class AppointmentDetailsComponent implements OnInit {
  _appointment: Appointment = new Appointment("", 1, 10000, "patient", 100, "", "", "");
  appointment: Appointment[] = [];
  constructor(public appointmentService: AppointmentService, public router: Router, public location: Location, public fb: FormBuilder) {
  }
  ngOnInit() {
    this.appointmentService.getAllAppointment().subscribe(data => {
      this.appointment = data;
    })
  }
  addAppointment() {
    this.appointmentService.addAppointment(this._appointment).subscribe(newAppointment => {
      console.log(newAppointment);
      // this.appointment.push(newAppointment);
      this.router.navigateByUrl("/appointment");
      this.location.back();

    });
  }
}
