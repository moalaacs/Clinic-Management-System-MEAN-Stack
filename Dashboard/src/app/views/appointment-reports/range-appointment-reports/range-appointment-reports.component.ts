import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Appointment } from '../../../models/appointment-report';
import { AppointmentsReportsService } from '../../../services/appointments-reports.service';

@Component({
  selector: 'app-range-appointment-reports',
  templateUrl: './range-appointment-reports.component.html',
  styleUrls: ['./range-appointment-reports.component.scss']
})
export class RangeAppointmentReportsComponent {
  appointments: Appointment[] = [];
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  logDateRange() {
    let startDate = JSON.stringify(this.range.controls.start.value).split("T")[0].split('"')[1];
    let endDate = JSON.stringify(this.range.controls.end.value).split("T")[0].split('"')[1];
    let strRange = `${startDate}/${endDate}`;
    console.log(strRange);
    this.AppointmentsReportsService.getRangeAppointmentsReports(strRange).subscribe(data => {
      this.appointments = data;
    })
  }
  constructor(public AppointmentsReportsService: AppointmentsReportsService, public router: Router) {
  }

}
