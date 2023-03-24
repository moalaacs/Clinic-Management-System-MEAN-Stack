import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DoctorService } from 'src/app/services/doctor.service';
import { Doctor } from 'src/app/models/doctor';
@Component({
  selector: 'app-doctor-add',
  templateUrl: './doctor-add.component.html',
  styleUrls: ['./doctor-add.component.css']
})
export class DoctorAddComponent implements OnInit {

  minDate: Date;
  maxDate: Date;
  defaultDate: Date;
  image: any;

  weeklyDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]



  validationMessages = {
    firstname: {
      required: 'First name is required.',
      pattern: 'Name should be a string and contain only letters and spaces',
      minlength: 'Length of name should be greater than 3 characters'
    },
    lastname: {
      required: 'Last name is required.',
      pattern: 'Name should be a string and contain only letters and spaces',
      minlength: 'Length of name should be greater than 3 characters'
    },
    dateOfBirth: {
      required: 'Date of birth is required.',
      pattern: 'Invalid date format, should be DD/MM/YYYY'
    },
    gender: {
      required: 'Gender is required.',
    },
    phoneNumber: {
      required: 'Phone number is required.',
      pattern: 'Contact number should be a number'
    },
    email: {
      required: 'Email is required.',
      email: 'Email should be in the form example@example.com'
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
    password: {
      required: 'Password is required.',
      pattern: 'Password should be a string',
      minlength: 'Length of password should be greater than 7 characters'
    },
    clinicId: {
      required: 'Clinic Id is required.',
      pattern: 'Clinic Id should be a number'
    },
    speciality: {
      required: 'Speciality is required.',
      pattern: 'Speciality should be a string'
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
    this.maxDate = new Date('2000-12-31');
    this.defaultDate = new Date('1999-01-10');
  }

  doctorForm = this.fb.group({
    firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3)]],
    lastname: ['', [Validators.required,Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3)]],
    dateOfBirth: ['',Validators.required,],
    gender: ['',Validators.required,],
    phoneNumber: ['', [Validators.required,Validators.pattern('[0-9]*')]],
    email: ['', [Validators.required,Validators.email]],
    address: this.fb.group({
      street: ['', [Validators.required,Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2)]],
      city: ['', [Validators.required,Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3)]],
      country: ['', [Validators.required,Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2)]],
      zipCode: ['', [Validators.required,Validators.pattern('[0-9]*'), Validators.minLength(5)]]
    }),
    password: ['', [Validators.required,
      Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\\-=[\\]{};\'\\:"|,.<>\\/?]).{7,}$'),
      Validators.minLength(8)
    ]],
    image: [''],
    medicalHistory: '',
    invoices: [[]],
    schedule: this.fb.array([this.scheduleForm()]),
    speciality: ['',Validators.required,]
  });
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
    this.doctorForm.controls["schedule"].push(this.scheduleForm());
  }
  ngOnInit(): void {

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
        this.snackBar.open('Patient updated successfully.', 'Close', {
          duration: 3000
        });
        this.location.back();
      },
      error => {
        this.snackBar.open(error.message, 'Close', {
          duration: 3000
        });
      }
)
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file
    }
  }

  goBack(): void {
    this.location.back();
  }
}
