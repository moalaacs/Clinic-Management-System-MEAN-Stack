import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from '../services/appointment.service';
import { Location } from '@angular/common';
import { Appointment } from '../models/appointment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  id: number = 0;
  _appointment: Appointment = new Appointment("", 1000, 100, "PType", 10, "Date", "Time", "Status");

  appointment: Appointment[] = [];

  constructor(public appointmentService: AppointmentService, public router: Router, public location: Location) {
  }
  sub: Subscription | null = null;
  ngOnInit() {
    this.appointmentService.getAllAppointment().subscribe(data => {
      this.appointment = data;
    })
  }
  addAppointment(appointment: Appointment) {
    this.appointmentService.addAppointment(appointment).subscribe(newAppointment => {
      this.appointment.push(newAppointment);
    });
  }
  updateAppointment() {
    this.appointmentService.updateAppointment(this._appointment).subscribe(appointmentUpdated => {
      const index = this.appointment.findIndex(app => app._id == appointmentUpdated._id);
      if (index >= 0) {
        this.appointment[index] = appointmentUpdated;
      }
    });
  }
  deleteAppointment(appointment: Appointment) {
    if (confirm('Are you sure you want to delete this appointment?!')) {
      this.appointmentService.deleteAppointmentById(appointment._id).subscribe(() => {
        const index = this.appointment.findIndex(app => app._id == appointment._id);
        if (index >= 0) {
          this.appointment.splice(index, 1);
        }
        this.location.back();
      });
    }
  }

}
