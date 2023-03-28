import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';


import { DoctorService } from 'src/app/services/doctor.service';
import { clinic } from 'src/app/models/clinic';

@Component({
  selector: 'app-doctor-edit',
  templateUrl: './doctor-edit.component.html',
  styleUrls: ['./doctor-edit.component.css']
})
export class DoctorEditComponent implements OnInit {

  doctorId: number = 0;
  doctor: any = null;
  updatedDoctor: any = {};

  minDate: Date;
  maxDate: Date;
  defaultDate: Date;

  file: any;
  image: any;

  doctorForm: FormGroup = new FormGroup({});

  clinics: clinic[] = [];


  endTimeList: string[][] = [];
  currentScheduleIndex = 0;
  scheduleLength = 0;

  weeklyDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  availableDays: string[][] = this.weeklyDays.map(() => [...this.weeklyDays]);

  specialities = [
    "Pediatrician", "Gynecologist", "Cardiologist", "Dermatologist", "Psychiatrist", "Neurologist", "Radiologist", "Dentist", "Surgeon"];

  specialityToSpecalization: SpecialityToSpecialization = {
    Pediatrician: "Pediatrics",
    Gynecologist: "Women's Health",
    Cardiologist: "Cardiology",
    Dermatologist: "Dermatology",
    Psychiatrist: "Physical Therapy",
    Neurologist: "Neurology",
    Radiologist: "Radiologic",
    Dentist: "Dental",
    Surgeon: "Surgical"
  }


  validationMessages = {
    firstname: {
      pattern: 'Name should be a string and contain only letters and spaces',
      minlength: 'Length of name should be greater than 3 characters'
    },
    lastname: {
      pattern: 'Name should be a string and contain only letters and spaces',
      minlength: 'Length of name should be greater than 3 characters'
    },

    phoneNumber: {
      pattern: 'Phone number should be a number',
      minlength: 'Length of phone number should be 11 characters',
      maxlength: 'Length of phone number should be 11 characters'
    },
    email: {
      email: 'Email should be in the form example@example.com'
    },
    dateOfBirth: {
      pattern: 'Invalid date format, should be DD/MM/YYYY'
    },
    password: {
      pattern: 'Password must contains different characters (aA1@)',
      minlength: 'Length of password should be greater than 7 characters'

    },

    address: {
      street: {
        pattern: 'Invalid format',
        minlength: 'Length of street should be greater than 2 characters'
      },
      city: {
        pattern: 'Country should contain charaters only',
        minlength: 'Length of street should be greater than 2 characters'
      },
      country: {
        pattern: 'Country should be a string',
        minlength: 'Length of street should be greater than 2 characters'
      },
      zipCode: {
        pattern: 'Zip code should be a number',
        minlength: 'Length of Zip code should be 5 characters',
        maxlength: 'Length of Zip code should be 5 characters'
      }
    },
    medicalHistory: {
      pattern: 'Medical history should be a string'
    },
  };

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private doctorService: DoctorService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {
    this.minDate = new Date('1963-01-01');
    this.maxDate = new Date('1996-12-31');
    this.defaultDate = new Date('1996-01-10');

    this.doctorForm = this.fb.group({
      firstname: ['', [Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3)]],
      lastname: ['', [Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3)]],
      email: ['', [Validators.email]],
      phoneNumber: ['', [Validators.pattern(/^01[0125](\-)?[0-9]{8}$/), Validators.minLength(11), Validators.maxLength(11)]],
      password: ['', [

        Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\\-=[\\]{};\'\\:"|,.<>\\/?]).{7,}$'),
        Validators.minLength(8)
      ]],
      dateOfBirth: [''],
      gender: [''],
      address: this.fb.group({
        street: ['', [Validators.pattern(/^[\u0621-\u064Aa-zA-Z0-9 .\-\\]*$/), Validators.minLength(2)]],
        city: ['', [Validators.pattern(/^[\u0621-\u064Aa-zA-Z0-9 .\-]*$/), Validators.minLength(3)]],
        country: ['', [Validators.pattern(/^[\u0621-\u064Aa-zA-Z]*$/), Validators.minLength(2)]],
        zipCode: ['', [Validators.pattern('[0-9]*'), Validators.minLength(5), Validators.maxLength(5)]]
      }),

      image: [''],
      medicalHistory: ['', Validators.pattern('^[a-zA-Z ]+$')], invoices: [],
      schedule: this.fb.array([this.scheduleForm()]),
      clinicId: ['', [Validators.pattern('[0-9]*')]],
      speciality: ['']
    });
  }

  ngOnInit(): void {
    this.doctorId = Number(this.route.snapshot.paramMap.get('id'));
    this.doctorService.getDoctorById(this.doctorId).pipe(
      map(response => response.data)).subscribe(
        (data) => {
          data.clinicId = data.clinicId._id;
          let date = new Date(data.dateOfBirth);
          data.dateOfBirth = date;
          this.doctor = data;
          this.doctorForm.patchValue(this.doctor);
        }
      );
    this.doctorForm.controls['firstname'].valueChanges.subscribe((value) => {
      if (value !== this.doctor.firstname) {
        this.updatedDoctor.firstname = value;
      }
    });
    this.doctorForm.controls['lastname'].valueChanges.subscribe((value) => {
      if (value !== this.doctor.lastname) {
        this.updatedDoctor.lastname = value;
      }
    });
    this.doctorForm.controls['dateOfBirth'].valueChanges.subscribe((value) => {
      if (value !== this.doctor.dateOfBirth && value != null) {
        const date = new Date(value);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        const formattedDate = `${day}/${month}/${year}`;
        this.updatedDoctor.dateOfBirth = formattedDate;
      }
    });
    this.doctorForm.controls['gender'].valueChanges.subscribe((value) => {
      if (value !== this.doctor.gender) {
        this.updatedDoctor.gender = value;
      }
    });
    this.doctorForm.controls['phoneNumber'].valueChanges.subscribe((value) => {
      if (value !== this.doctor.phoneNumber) {
        this.updatedDoctor.phoneNumber = value;
      }
    });
    this.doctorForm.controls['email'].valueChanges.subscribe((value) => {
      if (value !== this.doctor.email) {
        this.updatedDoctor.email = value;
      }
    });
    this.doctorForm.controls['address'].valueChanges.subscribe((value) => {
      if (JSON.stringify(value) !== JSON.stringify(this.doctor.address)) {
        this.updatedDoctor.address = value;
      }
    });
    this.doctorForm.controls['password'].valueChanges.subscribe((value) => {
      if (value !== this.doctor.password) {
        this.updatedDoctor.password = value;
      }
    });
    this.doctorForm.controls['image'].valueChanges.subscribe((value) => {
      if (value !== this.doctor.image) {
        this.updatedDoctor.image = value;
      }
    });
    this.doctorForm.controls['medicalHistory'].valueChanges.subscribe((value) => {
      if (value !== this.doctor.medicalHistory) {
        this.updatedDoctor.medicalHistory = value;
      }
    });
    this.doctorForm.controls['invoices'].valueChanges.subscribe((value) => {
      if (value !== this.doctor.invoices) {
        this.updatedDoctor.invoices = value;
      }
    });
    this.doctorForm.controls['schedule'].valueChanges.subscribe((value) => {
      if (JSON.stringify(value) !== JSON.stringify(this.doctor.schedule)) {
        this.updatedDoctor.schedule = value;
      }
    });
    this.doctorForm.controls['clinicId'].valueChanges.subscribe((value) => {
      if (value !== this.doctor.clinicId) {
        this.updatedDoctor.clinicId = value;
      }
    });
    this.doctorForm.controls['speciality'].valueChanges.subscribe((value) => {
      if (value !== this.doctor.speciality) {
        this.updatedDoctor.speciality = value;
      }
    });
  }


  scheduleForm() {
    return this.fb.group({
      day: ["", Validators.required],
      start: [""],
      end: [""]
    })
  }
  get schedule() {
    return this.doctorForm.controls["schedule"] as FormArray
  }

  addScheudle() {
    this.scheduleLength++;
    const newSchedule = this.scheduleForm();

    (<FormArray>this.doctorForm.controls["schedule"]).push(newSchedule);

    this.endTimeList.push([]);

    this.currentScheduleIndex = (<FormArray>this.doctorForm.controls["schedule"]).length - 1;

    const selectedDay = this.doctorForm.controls["schedule"].value[this.scheduleLength - 1].day;
    const dayIndex = this.availableDays[this.scheduleLength - 1].indexOf(selectedDay);
    if (dayIndex !== -1) {
      for (let i = this.scheduleLength; i < this.availableDays.length; i++) {
        this.availableDays[i].splice(dayIndex, 1);
      }
    }


  }

  removeSchedule(index: number) {
    this.scheduleLength--;
    this.schedule.removeAt(index);
    this.endTimeList.splice(index, 1);
  }

  onDayChange(event: any, index: number) {
    const selectedDay = event.value;
    const dayIndex = this.availableDays[index].indexOf(selectedDay);
    if (dayIndex !== -1) {
      for (let i = index; i < this.availableDays.length; i++) {
        this.availableDays[i].splice(dayIndex, 1);
      }
    }
  }

  onStartTimeChange(event: any, index: number) {
    const startTime = event.value;
    const endTimeList = this.getEndTimeList(startTime);
    this.endTimeList[index] = endTimeList;
  }


  getStartTimeList(): string[] {
    const startTimeList = [];

    for (let i = 0; i < 23; i++) {
      for (let j = 0; j < 60; j += 30) {
        const startTime = moment({ hour: i, minute: j }).format('HH:mm');
        startTimeList.push(startTime);
      }
    }

    return startTimeList;
  }


  getEndTimeList(startTime: string) {
    const availableEndTimes = [];
    const start = moment(startTime, "HH:mm");
    for (let i = start.hour(); i < 24; i++) {
      for (let j = 0; j < 60; j += 30) {
        const endTime = moment({ hour: i, minute: j }).format("HH:mm");
        if (moment(endTime, "HH:mm").isAfter(start)) {
          availableEndTimes.push(endTime);
        }
      }
    }
    return availableEndTimes;
  }


  updateEndTimeList(index: number) {
    const startControl = this.schedule.at(index).get("start");
    const endControl = this.schedule.at(index).get("end");
    const selectedStartTime = startControl?.value;
    const startTime = moment(selectedStartTime, "HH:mm");
    const availableEndTimes = [];

    if (!selectedStartTime) {
      endControl?.disable();
    } else {
      endControl?.enable();


      for (let i = startTime.hour(); i < 24; i++) {
        for (let j = 0; j < 60; j += 30) {
          const endTime = moment({ hour: i, minute: j }).format("HH:mm");
          if (moment(endTime, "HH:mm").isAfter(startTime)) {
            availableEndTimes.push(endTime);
          }
        }
      }
      this.endTimeList[index] = availableEndTimes;
    }
  }

  onSpecialityChange() {
    const speciality = this.doctorForm.get('speciality')?.value;
    if (speciality) {
      let specialization = this.specialityToSpecalization[speciality];
      this.doctorService.getClinicsBySpeciality(specialization).subscribe((clinics: any) => {
        this.clinics = clinics.data;
      });
    }
  }




  onSubmit(): void {
    const savedDoctor: Observable<any> = this.doctorService.patchDoctorById(this.doctorId, this.updatedDoctor, this.image)
    savedDoctor.subscribe(
      data => {
        this.snackBar.open('Doctor updated successfully', 'Close', {
          duration: 3000
        });
        this.location.back();
      },
      error => {
        this.snackBar.open(error.message, 'Close', {
          duration: 3000
        });
      }
    );
  }
  onFileSelected(event: any, element: HTMLSpanElement) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.image = this.file
      element.innerHTML = this.file.name;
    }
  }

  goBack() {
    this.location.back();
  }
}


interface SpecialityToSpecialization {
  [key: string]: string;
}

