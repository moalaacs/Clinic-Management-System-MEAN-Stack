import { Component, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { ADDRESS } from './../../models/Address';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Patient } from 'src/app/models/patient';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  hide  = true;
  file: any;
  image: any;
  addresses = ADDRESS;
  minDate: Date;
  maxDate: Date;
  defaultDate: Date;

  validationMessages = {
    firstname: {
      required: 'First name is required.',
      pattern: 'Name should be a string and contain only letters and spaces',
      minlength: 'Length of name should be greater than 3 characters',
    },
    lastname: {
      required: 'Last name is required.',
      pattern: 'Name should be a string and contain only letters and spaces',
      minlength: 'Length of name should be greater than 3 characters',
    },
    dateOfBirth: {
      required: 'Date of birth is required.',
      pattern: 'Invalid date format, should be DD/MM/YYYY',
    },
    gender: {
      required: 'Gender is required.',
    },
    phoneNumber: {
      required: 'Phone number is required.',
      pattern: 'Contact number should be a number',
    },
    email: {
      required: 'Email is required.',
      email: 'Email should be in the form example@example.com',
    },
    street: {
      required: 'Street is required.',
      pattern: 'Street should be a string',
      minlength: 'Length of street should be greater than 2 characters',
    },
    city: {
      required: 'City is required.',
      pattern: 'City should be a string',
      minlength: 'Length of street should be greater than 3 characters',
    },
    country: {
      required: 'Country is required.',
      pattern: 'Country should be a string',
      minlength: 'Length of street should be greater than 2 characters',
    },
    zipCode: {
      required: 'Zip code is required.',
      pattern: 'Zip code should be a number',
      minlength: 'Length of Zip code should be 5 characters',
      maxlength: 'Length of Zip code should be 5 characters'
    },
    password: {
      required: 'Password is required.',
      pattern: 'Password should be a string',
      minlength: 'Length of password should be greater than 7 characters',
    }
  };
  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.minDate = new Date('1963-01-01');
    this.maxDate = new Date('2000-12-31');
    this.defaultDate = new Date('1999-01-10');
  }

  registerform = this.builder.group({
    firstname: this.builder.control(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(/^[a-zA-Z ]+$/),
      ])
    ),
    lastname: this.builder.control(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(/^[a-zA-Z ]+$/),
      ])
    ),
    password: this.builder.control(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),
        Validators.minLength(2),
      ])
    ),
    email: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    gender: this.builder.control('female', Validators.required),
    phoneNumber: this.builder.control(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(/^01[0125](\-)?[0-9]{8}$/),
      ])
    ),
    dateOfBirth: this.builder.control('', Validators.required),
    image:this.builder.control(''),
    'address.city': this.builder.control(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(/^[a-zA-Z ]+$/),
      ])
    ),
    'address.country': this.builder.control(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(/^[a-zA-Z ]+$/),
      ])
    ),
    'address.zipCode': this.builder.control(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]*'),
        Validators.minLength(5),
        Validators.maxLength(5),
      ])
    ),
    'address.street': this.builder.control(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(/^[a-zA-Z ]+$/),
        Validators.minLength(2),
      ])
    ),
  });

  getFile(event: any, element: HTMLSpanElement) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.image = this.file
      element.innerHTML = this.file.name;
    }
  }

  proceedregister() {
    console.log(this.registerform.controls['address.zipCode'].errors);
    const date = new Date(this.registerform.value.dateOfBirth!);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    const formattedDate = `${day}/${month}/${year}`;
    this.registerform.value.dateOfBirth = formattedDate;
    console.log(this.registerform.value);
    const patient = this.registerform.value as Patient;
    let rC = this;
    if (this.registerform.valid) {
      this.service.registerUser(patient, this.file).subscribe({
        next() {
          rC.snackBar.open('Registered To System Successfully', '', {
            duration: 3000,
          });
          rC.router.navigate(['login']);
        },
        error(err) {
          rC.snackBar.open(err.error.message, '', {
            duration: 3000,
          });
        },
      });
    } else {
      rC.snackBar.open('Please enter valid data', '', {
        duration: 3000,
      });
    }
  }
}
