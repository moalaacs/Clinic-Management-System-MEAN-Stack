import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/models/appointment-report';
import { AppointmentsReportsService } from 'src/app/services/appointments-reports.service';

@Component({
  selector: 'app-all-appointment-reports',
  templateUrl: './all-appointment-reports.component.html',
  styleUrls: ['./all-appointment-reports.component.css']
})
export class AllAppointmentReportsComponent {
  constructor(public AppointmentsReportsService: AppointmentsReportsService, public router: Router) {
  }
  appointments: Appointment[] = [];

  ngOnInit() {
    this.AppointmentsReportsService.getAllAppointmentsReports().subscribe(data => {
      this.appointments = data;
      this.appointments.forEach(element => {
        console.log(element);
      });
    })
  }
}
