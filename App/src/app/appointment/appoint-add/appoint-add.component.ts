import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AppointmentService } from 'src/app/services/appointment.service';
import { Location } from '@angular/common';
import { Appointment } from 'src/app/models/appointment';
import { MyErrorStateMatcher } from 'src/app/models/ErrorStateMatcher';

/*interface patientType {
  patient: string;
  doctor: string;
  employee: string;
}*/

@Component({
  selector: 'app-appoint-add',
  templateUrl: './appoint-add.component.html',
  styleUrls: ['./appoint-add.component.css']
})
export class AppointAddComponent {
  _appointment: Appointment = new Appointment("", 1, 100, "", 10, "", "", "");
  appointment: Appointment[] = [];
  /*patientType: patientType[] = [
    {value: 'patient', viewValue: 'patient'},
    {value: 'doctor', viewValue: 'doctor'},
    {value: 'employee', viewValue: 'employee'},
  ];*/
  appointmentForm: FormGroup;
  matcher: MyErrorStateMatcher;
  minDate: Date;
  maxDate: Date;

  constructor(public appointmentService: AppointmentService, public router: Router, public location: Location, public fb: FormBuilder) {
    this.minDate = new Date('2023-03-20');
    this.maxDate = new Date('2030-12-31');
    this.appointmentForm = this.fb.group({
      // _id: ['', [Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z\\s]+")]],
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
  // get id() {
  //   return this.appointmentForm.get('_id');
  // }
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
  // addAppointment(errorH5: HTMLElement) {
  //   errorH5.innerHTML = '';
  //   this.appointmentService.addAppointment(this._appointment).subscribe(newAppointment => {
  //     console.log(newAppointment);
  //     this.router.navigateByUrl("/appointment");
  //     this.location.back();
  //   });
  // }
  onSubmit() {
    const datee = new Date(this.appointmentForm.value.date);
    const day = datee.getDate().toString().padStart(2, '0');
    const month = (datee.getMonth() + 1).toString().padStart(2, '0');
    const year = datee.getFullYear().toString();
    const formattedDate = `${day}/${month}/${year}`;
    this.appointmentForm.value.date = formattedDate;

    const appointment = this.appointmentForm.value;
    this.appointmentService.addAppointment(this.appointmentForm.value).subscribe(
      () => this.router.navigate(['/appointment']))
  }
}
