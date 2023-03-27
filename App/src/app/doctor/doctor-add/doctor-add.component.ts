import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { DoctorService } from 'src/app/services/doctor.service';
import { Doctor } from 'src/app/models/doctor';
import {clinic  } from 'src/app/models/clinic';
@Component({
  selector: 'app-doctor-add',
  templateUrl: './doctor-add.component.html',
  styleUrls: ['./doctor-add.component.css']
})
export class DoctorAddComponent implements OnInit {
  file: any;
  minDate: Date;
  maxDate: Date;
  defaultDate: Date;
  image: any;
  doctorForm: FormGroup = new FormGroup({});
  clinics: clinic[] = [];
  endTimeList: string[][] = [];
  currentScheduleIndex = 0;
  scheduleLength =0;

  weeklyDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  availableDays: string[][] = this.weeklyDays.map(() => [...this.weeklyDays]);

  specialities = [
    "Pediatrician","Gynecologist","Cardiologist","Dermatologist","Psychiatrist","Neurologist","Radiologist", "Dentist", "Surgeon"];

  specialityToSpecalization:SpecialityToSpecialization = {
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
      required: 'First name is required.',
      pattern: 'Name should contains only letters and spaces',
      minlength: 'Length of name should be greater than 3 characters'
    },
    lastname: {
      required: 'Last name is required.',
      pattern: 'Name should contains only letters and spaces',
      minlength: 'Length of name should be greater than 3 characters'
    },
    phoneNumber: {
      required: 'Phone number is required.',
      pattern: 'Phone number should contains only numbers',
      minlength: 'Phone number should consist of 11 digits'
    },
    email: {
      required: 'Email is required.',
      email: 'Email should be in the form example@example.com'
    },
    dateOfBirth: {
      required: 'Date of birth is required.',
      pattern: 'Invalid date format, should be DD/MM/YYYY'
    },

    password: {
      required: 'Password is required.',
      pattern: 'Password must contains different characters (aA1@)',
      minlength: 'Length of password should be greater than 7 characters'
    },
    gender: {
      required: 'Gender is required.',
    },


    address: {
      street: {
        required: 'Street is required.',
        pattern: 'Street should be a string',
        minlength: 'Length of street should be greater than 2 characters'
      },
      city: {
        required: 'City is required.',
        pattern: 'City should be a string',
        minlength: 'Length of street should be greater than 3 characters'
      },
      country: {
        required: 'Country is required.',
        pattern: 'Country should be a string',
        minlength: 'Length of street should be greater than 2 characters'
      },
      zipCode: {
        required: 'Zip code is required.',
        pattern: 'Zip code should be a number',
        minlength: 'Length of Zip code should be 5 characters'
      }
    },

    clinicId: {
      required: 'Clinic Id is required.',
    },
    speciality: {
      required: 'Speciality is required.',
    },
    medicalHistory: {
      pattern: 'Medical history should be a string'
    },
    image: {
      pattern: 'Image should be a string'
    }

  };

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {

    this.minDate = new Date('1963-01-01');
    this.maxDate = new Date('1997-12-31');
    this.defaultDate = new Date('1999-01-10');


    this.doctorForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(11)]],
      password: ['', [Validators.required,
      Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\\-=[\\]{};\'\\:"|,.<>\\/?]).{7,}$'),
      Validators.minLength(8)
      ]],
      dateOfBirth: ['', Validators.required],
      gender: ['female', Validators.required],
      address: this.fb.group({
        street: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2)]],
        city: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3)]],
        country: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2)]],
        zipCode: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(5)]]
      }),
      clinicId: ['', Validators.required],
      image: [''],
      medicalHistory: '',
      invoices: [[]],
      schedule: this.fb.array([this.scheduleForm()]),
      speciality: ['', Validators.required]
    });
  }


  ngOnInit(): void {
  }

  getStartTimeList(): string[] {
    const startTimeList = [];

    for (let i = 0; i < 23; i++) {
      for (let j = 0; j < 60; j += 30) {
        const startTime = moment({hour: i, minute: j}).format('HH:mm');
        startTimeList.push(startTime);
      }
    }

    return startTimeList;
  }


  onSpecialityChange() {
    const speciality = this.doctorForm.get('speciality')?.value;
    if (speciality) {
      let specialization = this.specialityToSpecalization[speciality];
      this.doctorService.getClinicsBySpeciality(specialization).subscribe(clinics => {
        this.clinics = clinics;
      });
    }
  }


  scheduleForm(){
    return this.fb.group({
      day: ["", Validators.required],
      start: [""],
      end: [""],
    })
  }
  get schedule() {
    return this.doctorForm.controls["schedule"] as FormArray
  }
  addScheudle() {
  this.scheduleLength++;
  const newSchedule = this.scheduleForm();
  (<FormArray> this.doctorForm.controls["schedule"]).push(newSchedule);
  this.endTimeList.push([]);

  this.currentScheduleIndex = (<FormArray> this.doctorForm.controls["schedule"]).length - 1;

  const selectedDay = this.doctorForm.controls["schedule"].value[this.scheduleLength-1].day;
  const dayIndex = this.availableDays[this.scheduleLength-1].indexOf(selectedDay);
  if (dayIndex !== -1) {
    for(let i = this.scheduleLength; i < this.availableDays.length; i++) {
      this.availableDays[i].splice(dayIndex, 1);
    }
  }
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




  onSubmit() {
    let formDate = this.doctorForm.get("dateOfBirth")?.value as string
    const date = new Date(formDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    const formattedDate = `${day}/${month}/${year}`;
    this.doctorForm.get("dateOfBirth")?.setValue(formattedDate);
    const doctor = this.doctorForm.value as unknown as Doctor;
    this.doctorService.addDoctor(doctor, this.image).subscribe(
      () => {
        this.snackBar.open('Doctor added successfully.', 'Close', {
          duration: 3000
        });
        this.location.back();
      },
      error => {
        this.snackBar.open(error.message, 'Close', {
          duration: 3000
        });
        console.log(error);
      }
    )
  }

  onFileSelected(event: any, element: HTMLSpanElement) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.image = this.file
      element.innerHTML = this.file.name;
    }
  }

  goBack(): void {
    this.location.back();
  }
}


interface SpecialityToSpecialization {
  [key: string]: string;
}

