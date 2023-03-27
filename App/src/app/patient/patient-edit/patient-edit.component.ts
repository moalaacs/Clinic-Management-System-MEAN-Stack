import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.css']
})
export class PatientEditComponent implements OnInit {

  patientId: number = 0;
  patient: any = null ;
  updatedPatient: any = {};
  patientForm: FormGroup;


  minDate: Date;
  maxDate: Date;
  defaultDate: Date;

  file: any;
  image: any;


  validationMessages = {
    firstname: {
      pattern: 'Name should be a string and contain only letters and spaces',
      minlength: 'Length of name should be greater than 3 characters'
    },
    lastname: {
      pattern: 'Name should be a string and contain only letters and spaces',
      minlength: 'Length of name should be greater than 3 characters'
    },
    dateOfBirth: {
      pattern: 'Invalid date format, should be DD/MM/YYYY'
    },

    phoneNumber: {
      pattern: 'Contact number should be a number',
      minlength: 'Length of phone number should be 11 characters',
      maxlength: 'Length of phone number should be 11 characters'
    },
    email: {
      email: 'Email should be in the form example@example.com'
    },
    address: {
      street: {
        pattern: 'Invalid format',
        minlength: 'Length of street should be greater than 2 characters'
      },
      city: {
        pattern: 'Invalid format only allowed charaters are ( - . )',
        minlength: 'Length of street should be greater than 3 characters'
      },
      country: {
        pattern: 'Country should contain charaters only',
        minlength: 'Length of street should be greater than 2 characters'
      },
      zipCode: {
        pattern: 'Zip code should be a number',
        minlength: 'Length of Zip code should be 5 characters',
        maxlength: 'Length of Zip code should be 5 characters'
      }
    },
    password: {
      pattern: 'Password should be a string',
      minlength: 'Length of password should be greater than 7 characters'
    },
    medicalHistory: {
      pattern: 'Medical history should be a string'
    },

  };

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private patientService: PatientService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {

    this.minDate = new Date('1963-01-01');
    this.maxDate = new Date('1996-12-31');
    this.defaultDate = new Date('1996-01-10');

    this.patientForm = this.fb.group({
      firstname: ['',[Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]+$')]],
      lastname: ['',[Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]+$')]],
      dateOfBirth: [''],
      gender: [''],
      phoneNumber: ['',[ Validators.pattern(/^01[0125](\-)?[0-9]{8}$/), Validators.minLength(11), Validators.maxLength(11)]],
      email: ['', [ Validators.email]],
      address: this.fb.group({
        street: ['', [
          Validators.minLength(2),
          Validators.pattern(/^[\u0621-\u064Aa-zA-Z0-9 .\-\\]*$/)
        ]],
        city: ['', [
          Validators.minLength(2),
          Validators.pattern(/^[\u0621-\u064Aa-zA-Z0-9 .\-]*$/)
        ]],
        country: ['', [
          Validators.minLength(2),
          Validators.pattern(/^[\u0621-\u064Aa-zA-Z]*$/)
        ]],
        zipCode:['', Validators.compose([
          Validators.minLength(5),
          Validators.maxLength(5),
          Validators.pattern(/^\d+$/),
        ])]
      }),
      password: [''],
      image: [''],
      medicalHistory: ['', Validators.pattern('^[a-zA-Z ]+$') ],      invoices: []
    });

  }

  ngOnInit(): void {
    this.patientId = Number(this.route.snapshot.paramMap.get('id'));
    this.patientService.getPatientById(this.patientId).pipe(
          map(response => response.data)).subscribe(data => {
          let date = new Date(data.dateOfBirth);
          data.dateOfBirth = date;

          this.patient = data;
          this.patientForm.patchValue(data);
    });

    this.patientForm.controls['firstname'].valueChanges.subscribe((value)=> {
      if (value !== this.patient.firstname) {
        this.updatedPatient.firstname = value;
      }
    });

    this.patientForm.controls['lastname'].valueChanges.subscribe((value) => {
      if (value !== this.patient.lastname) {
        this.updatedPatient.lastname = value;
      }
    });
    this.patientForm.controls['dateOfBirth'].valueChanges.subscribe((value) => {
      if (value !== this.patient.dateOfBirth && value != null) {
        const date = new Date(value);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        const formattedDate = `${day}/${month}/${year}`;
        this.updatedPatient.dateOfBirth = formattedDate;
      }
    });
    this.patientForm.controls['gender'].valueChanges.subscribe((value) => {
      if (value !== this.patient.gender) {
        this.updatedPatient.gender = value;
      }
    });
    this.patientForm.controls['phoneNumber'].valueChanges.subscribe((value) => {
      if (value !== this.patient.phoneNumber) {
        this.updatedPatient.phoneNumber = value;
      }
    });
    this.patientForm.controls['email'].valueChanges.subscribe((value) => {
      if (value !== this.patient.email) {
        this.updatedPatient.email = value;
      }
    });
    this.patientForm.controls['address'].valueChanges.subscribe((value) => {
      if (JSON.stringify(value) !== JSON.stringify(this.patient.address)) {
        this.updatedPatient.address = value;
      }
    });
    this.patientForm.controls['password'].valueChanges.subscribe((value) => {
      if (value !== this.patient.password) {
        this.updatedPatient.password = value;
      }
    });
    this.patientForm.controls['image'].valueChanges.subscribe((value) => {
      if (value !== this.patient.image) {
        this.updatedPatient.image = value;
      }
    });
    this.patientForm.controls['medicalHistory'].valueChanges.subscribe((value) => {
      if (value !== this.patient.medicalHistory) {
        this.updatedPatient.medicalHistory = value;
      }
    });
    this.patientForm.controls['invoices'].valueChanges.subscribe((value) => {
      if (value.length !== this.patient.invoices.length) {
        this.updatedPatient.invoices = value;
      }
      else {
        for (let i = 0; i < value.length; i++) {
          if (value[i] !== this.patient.invoices[i]) {
            this.updatedPatient.invoices = value;
          }
        }
      }
    });




  }

  onSubmit(): void {
    const savePatient: Observable<any> = this.patientService.patchPatientById(this.patientId,this.updatedPatient, this.image)
    savePatient.subscribe(
      (data) => {
        this.snackBar.open('Patient updated successfully.', 'Close', {
          duration: 3000
        });
        this.location.back();
      },
      error => {
        this.snackBar.open("error updating patient, please try again later", 'Close', {
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
