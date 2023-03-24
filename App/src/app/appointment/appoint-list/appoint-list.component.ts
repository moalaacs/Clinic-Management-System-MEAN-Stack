import { Component } from '@angular/core';
import { Appointment } from 'src/app/models/appointment';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appoint-list',
  templateUrl: './appoint-list.component.html',
  styleUrls: ['./appoint-list.component.css']
})
export class AppointListComponent {
  appointment: Appointment[] = [];
  constructor(public appointmentService: AppointmentService, public router: Router, public location: Location) {

  }
  ngOnInit() {
    this.appointmentService.getAllAppointment().subscribe(data => {
      this.appointment = data.appointments;
    })
  }
}
