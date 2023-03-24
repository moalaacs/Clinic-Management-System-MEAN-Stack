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
  delete(id: string) {
    if (confirm('Are you sure you want to delete this appointment?!')) {
      this.appointmentService.deleteAppointmentById(id).subscribe(a => {
        // console.log(a);
        this.appointmentService.getAllAppointment().subscribe(() => {
        })
        // this.location.back();
      })
    }
    this.router.navigateByUrl("/appointment");
  }
  ngOnInit() {
    this.appointmentService.getAllAppointment().subscribe(data => {
      this.appointment = data.appointments;
    })
  }
}
