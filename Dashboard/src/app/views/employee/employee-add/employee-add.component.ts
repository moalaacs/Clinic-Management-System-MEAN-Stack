import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee';
import { clinic } from 'src/app/models/clinic';
import { ClinicService } from 'src/app/services/clinic.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {

  minDate: Date;
  maxDate: Date;
  defaultDate: Date;

  file: any;
  image: any;

  employeeForm: FormGroup = new FormGroup({});
  clinics: clinic[] = [];


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
      pattern: 'Contact number should be a number',
      minlength: 'Phone number should consist of 11 digits',
      maxlength: 'Phone number should consist of 11 digits'
    },
    email: {
      required: 'Email is required.',
      email: 'Email should be in the form example@example.com'
    },
    address: {
      street: {
        required: 'Street is required.',
        pattern: 'Invalid format',
        minlength: 'Length of street should be greater than 2 characters'
      },
      city: {
        required: 'City is required.',
        pattern: 'Invalid format only allowed charaters are ( - . )',
        minlength: 'Length of street should be greater than 3 characters'
      },
      country: {
        required: 'Country is required.',
        pattern: 'Country should contain charaters only',
        minlength: 'Length of street should be greater than 2 characters'
      },
      zipCode: {
        required: 'Zip code is required.',
        pattern: 'Zip code should be a number',
        minlength: 'Length of Zip code should be 5 characters',
        maxlength: 'Length of Zip code should be 5 characters'
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
    salary: {
      required: 'Salary is required.',
      pattern: 'Salary should be a number'
    },
    workingHours: {
      required: 'Working hours is required.',
      pattern: 'Working hours should be a number'
    },
    role: {
      required: 'Role is required.',
      pattern: 'Role should be a string'
    },
    medicalHistory: {
      pattern: 'Medical history should be a string'
    }
  };


  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private clinicService: ClinicService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {
    this.minDate = new Date('1963-01-01');
    this.maxDate = new Date('1996-12-31');
    this.defaultDate = new Date('1996-01-10');

    this.employeeForm = this.fb.group({
      firstname: ['', [Validators.required,
      Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3)]],
      dateOfBirth: ['', Validators.required],
      gender: ['female', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^01[0125](\-)?[0-9]{8}$/), Validators.minLength(11), Validators.maxLength(11)]],
      email: ['', [Validators.required, Validators.email]],
      address: this.fb.group({
        street: ['', [Validators.required, Validators.pattern(/^[\u0621-\u064Aa-zA-Z0-9 .\-\\]*$/), Validators.minLength(2)]],
        city: ['', [Validators.required, Validators.pattern(/^[\u0621-\u064Aa-zA-Z0-9 .\-]*$/), Validators.minLength(3)]],
        country: ['', [Validators.required, Validators.pattern(/^[\u0621-\u064Aa-zA-Z]*$/), Validators.minLength(2)]],
        zipCode: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(5), Validators.maxLength(5)]]
      }),
      password: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\\-=[\\]{};\'\\:"|,.<>\\/?]).{7,}$'),
        Validators.minLength(8)
      ]],
      image: [''],
      medicalHistory: ['', Validators.pattern('^[a-zA-Z ]+$')], invoices: [[]],
      clinicId: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      salary: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      workingHours: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      role: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    });

  }

  ngOnInit(): void {

    this.clinicService.getClinics().subscribe(
      (response) => {
        this.clinics = response.data;
      },
    );

  }
  onSubmit() {
    const date = new Date(this.employeeForm.value.dateOfBirth);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    const formattedDate = `${day}/${month}/${year}`;
    this.employeeForm.value.dateOfBirth = formattedDate;

    const employee = this.employeeForm.value as Employee;
    this.employeeService.addEmployee(employee, this.image).subscribe(
      () => {
        this.snackBar.open('Employee updated successfully.', 'Close', {
          duration: 3000
        });
        this.location.back();
      },
      error => {
        this.snackBar.open(
          "error adding employee, please try again later", 'Close', {
          duration: 3000
        });
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
