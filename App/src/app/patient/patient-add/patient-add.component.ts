import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PatientService } from 'src/app/services/patient.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Patient } from 'src/app/models/patient';

@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.css']
})
export class PatientAddComponent implements OnInit {

  patientForm: FormGroup = new FormGroup({});

  minDate: Date;
  maxDate: Date;
  defaultDate: Date;
  image: any;


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

  };


  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {
    this.minDate = new Date('1963-01-01');
    this.maxDate = new Date('2000-12-31');
    this.defaultDate = new Date('1999-01-10');

  }

  ngOnInit(): void {

    this.patientForm =  this.fb.group({
        firstname: ['', [Validators.required,
    Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3)]],
  lastname: ['', [Validators.required,Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3)]],
  dateOfBirth: ['',Validators.required],
  gender: ['',Validators.required],
  phoneNumber: ['', [Validators.required,Validators.pattern('[0-9]*')]],
  email: ['', [Validators.required,Validators.email]],
  address: this.fb.group({
    street: ['', [Validators.required,Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2)]],
    city: ['', [Validators.required,Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3)]],
    country: ['', [Validators.required,Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2)]],
    zipCode: ['', [Validators.required,Validators.pattern('[0-9]*'), Validators.minLength(5)]]
  }),
  password: ['', [
    Validators.required,
    Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\\-=[\\]{};\'\\:"|,.<>\\/?]).{7,}$'),
    Validators.minLength(8)
  ]],
  image: [''],
  medicalHistory: ''});
  }
  onSubmit() {
    const date = new Date(this.patientForm.value.dateOfBirth);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    const formattedDate = `${day}/${month}/${year}`;
    this.patientForm.value.dateOfBirth = formattedDate;
    const patient = this.patientForm.value as Patient;
    this.patientService.addPatient(patient, this.patientForm.value.image).subscribe(
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
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.patientForm.patchValue({
        image: reader.result as string
      });
    };
  }

  goBack(): void {
    this.location.back();
  }
}
