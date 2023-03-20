import { Component } from '@angular/core';
import { Appointment } from 'src/app/class/appointment';
import { AppointmentService } from 'src/app/service/appointment.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent {
  appointment: Appointment[] = [];
  constructor(public appointmentService: AppointmentService, public router: Router, public location: Location) {

  }
  ngOnInit() {
    this.appointmentService.getAllAppointment().subscribe(data => {
      this.appointment = data;
    })
  }
}
