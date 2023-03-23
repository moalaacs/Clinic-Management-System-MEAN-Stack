import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AppointmentService } from 'src/app/service/appointment.service';
import { Location } from '@angular/common';
import { Appointment } from 'src/app/class/appointment';
import { MyErrorStateMatcher } from 'src/app/class/ErrorStateMatcher';

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
      _clinicId: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      patientId: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      patientType: ['', [Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z\\s]+")]],
      _doctorId: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      _date: ['', [Validators.required, Validators.pattern("(0[1-9]|[1-2][0-9]|3[0-1])/(0[1-9]|1[0-2])/([0-9]{4})")]],
      _time: ['', [Validators.required, Validators.pattern("([0-5][0-9]):([0-5][0-9])")]],
      _status: ['', [Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z\\s]+")]],
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
  addMedicine(errorH5: HTMLElement) {
    errorH5.innerHTML = '';
    this.appointmentService.addAppointment(this._appointment).subscribe(newAppointment => {
      console.log(newAppointment);
      // this.medicine.push(newAppointment);
      this.router.navigateByUrl("/appointment");
      this.location.back();

    });
  }
}
