import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AppointmentService } from 'src/app/services/appointment.service';
import { Location } from '@angular/common';
import { Appointment } from 'src/app/models/appointment';
import { MyErrorStateMatcher } from 'src/app/models/ErrorStateMatcher';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-appoint-add',
  templateUrl: './appoint-add.component.html',
  styleUrls: ['./appoint-add.component.css']
})
export class AppointAddComponent {
  _appointment: Appointment = new Appointment("1", 1, 100, "patient", 10, "100", "09:00", "Pending");
  appointment: Appointment[] = [];
  appointmentForm: FormGroup;
  matcher: MyErrorStateMatcher;
  minDate: Date;
  maxDate: Date;

  constructor(public appointmentService: AppointmentService, public router: Router, public location: Location, public fb: FormBuilder, public mat: MatSnackBar) {
    this.minDate = new Date('2023-03-20');
    this.maxDate = new Date('2030-12-31');
    this.appointmentForm = this.fb.group({
      clinicId: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      patientId: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      patientType: ['', [Validators.required, /*Validators.pattern("[a-zA-Z][a-zA-Z\\s]+")*/]],
      doctorId: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      date: ['', [Validators.required,]],
      time: ['', [Validators.required, Validators.pattern("([0-5][0-9]):([0-5][0-9])")]],
      status: ['', [Validators.required, /*Validators.pattern("[a-zA-Z][a-zA-Z\\s]+")*/]],
    });
    this.matcher = new MyErrorStateMatcher();
  }
  ngOnInit() {
    this.appointmentService.getAllAppointment().subscribe(data => {
      this.appointment = data;
    })
  }
  get clinic() {
    return this.appointmentForm.get('_clinicId');
  }
  get patient() {
    return this.appointmentForm.get('patientId');
  }
  get type() {
    return this.appointmentForm.get('patientType');
  }
  get doctor() {
    return this.appointmentForm.get('_doctorId');
  }
  get date() {
    return this.appointmentForm.get('_date');
  }
  get time() {
    return this.appointmentForm.get('_time');
  }
  get status() {
    return this.appointmentForm.get('_status');
  }
  onSubmit() {
    const datee = new Date(this.appointmentForm.value.date);
    const day = datee.getDate().toString().padStart(2, '0');
    const month = (datee.getMonth() + 1).toString().padStart(2, '0');
    const year = datee.getFullYear().toString();
    const formattedDate = `${day}/${month}/${year}`;
    this.appointmentForm.value.date = formattedDate;
    console.log(this.appointmentForm.value);
    this.appointmentService.addAppointment(this.appointmentForm.value).subscribe(
      () => {
        this.router.navigate(['/appointment'])
      }, error => {
        this.mat.open(error.error.message, "", { duration: 3000 });
      })
  }
}
