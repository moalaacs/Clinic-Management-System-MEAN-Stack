import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {

  employeeForm: FormGroup = new FormGroup({});

  minDate: Date;
  maxDate: Date;
  defaultDate: Date;


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
    }
  };


  constructor(

    private employeeService: EmployeeService,
    private router: Router,
  ) {
    this.minDate = new Date('1963-01-01');
    this.maxDate = new Date('2000-12-31');
    this.defaultDate = new Date('1999-01-10');

  }

  ngOnInit(): void {

    this.employeeForm = new FormGroup({
      firstname: new FormControl('', [
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
      gender: new FormControl('', [Validators.required]),
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
      clinicId: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
      salary: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
      workingHours: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
      role: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
    });
  }
  onSubmit() {
    const date = new Date(this.employeeForm.value.dateOfBirth);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    const formattedDate = `${day}/${month}/${year}`;
    this.employeeForm.value.dateOfBirth = formattedDate;

    const employee = this.employeeForm.value;
    this.employeeService.addEmployee(employee).subscribe(
      () => this.router.navigate(['/employee']))
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.employeeForm.patchValue({
        image: reader.result as string
      });
    };
  }

  goBack(): void {
    this.router.navigate(['/employee']);
  }

}
