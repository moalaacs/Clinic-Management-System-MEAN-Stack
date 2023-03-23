import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.css']
})
export class PatientAddComponent implements OnInit {

  patientForm: FormGroup = new FormGroup({});

  startDate = new Date(1999, 0, 1);
  minDate = new Date(1940, 0, 1);
  maxDate = new Date(2023,0,1);

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

    private patientService: PatientService,
    private router: Router,
    public datePipe: DatePipe,
    private location: Location
  ) { }

  ngOnInit(): void {

    this.patientForm = new FormGroup({
      firstname: new FormControl('',[
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]+$')
      ]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]+$')
      ]),
      dateOfBirth: new FormControl('', [
        Validators.required,
      ]),
      age: new FormControl(''),
      gender: new FormControl('',[Validators.required]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormGroup({
        street: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('^[a-zA-Z\d]+$'),
        ]),
        city: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('^[a-zA-Z\d]+$'),
        ]),
        country: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('^[a-zA-Z\d]+$'),
        ]),
        zipCode: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(5),
          Validators.pattern(/^\d+$/),
        ]))
      }),
      password: new FormControl('', Validators.required),
      medicalHistory: new FormControl(''),
      image: new FormControl(''),
    });
  }
  onSubmit() {
    this.patientForm.value.dateOfBirth = this.datePipe.transform(this.patientForm.value.dateOfBirth, 'dd/MM/yyyy');
    const patient = this.patientForm.value;
    this.patientService.addPatient(patient, this.patientForm.value.image).subscribe(
      () =>this.location.back())
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
