import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Appointment } from '../../../models/appointment-report';
import { AppointmentsReportsService } from '../../../services/appointments-reports.service';

@Component({
  selector: 'app-doctor-appointment-reports',
  templateUrl: './doctor-appointment-reports.component.html',
  styleUrls: ['./doctor-appointment-reports.component.scss']
})
export class DoctorAppointmentReportsComponent {
  appointments: Appointment[] = [];
  doctorId = 1;

  getInputValue() {
    if (this.doctorId != null) {
      this.AppointmentsReportsService.getDoctorAppointmentsReports(this.doctorId).subscribe(data => {
        this.appointments = data;
      })
    }
  }
  constructor(public AppointmentsReportsService: AppointmentsReportsService, public router: Router) {
  }

}
