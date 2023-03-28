import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Appointment } from '../../../models/appointment-report';
import { AppointmentsReportsService } from '../../../services/appointments-reports.service';

@Component({
  selector: 'app-patient-appointment-reports',
  templateUrl: './patient-appointment-reports.component.html',
  styleUrls: ['./patient-appointment-reports.component.scss']
})
export class PatientAppointmentReportsComponent {
  appointments: Appointment[] = [];
  patientId = 1;

  getInputValue() {
    if (this.patientId != null) {
      this.AppointmentsReportsService.getPatientAppointmentsReports(this.patientId).subscribe(data => {
        this.appointments = data;
      })
    }
  }
  constructor(public AppointmentsReportsService: AppointmentsReportsService, public router: Router) {
  }
}
