import { Component, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ADDRESS } from './../../models/Address';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  file: any;
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
    'address.street': {
      required: 'Street is required.',
      pattern: 'Street should be a string',
      minlength: 'Length of street should be greater than 2 characters',
    },
    'address.city': {
      required: 'City is required.',
      pattern: 'City should be a string',
      minlength: 'Length of street should be greater than 3 characters',
    },
    'address.country': {
      required: 'Country is required.',
      pattern: 'Country should be a string',
      minlength: 'Length of street should be greater than 2 characters',
    },
    'address.zipCode': {
      required: 'Zip code is required.',
      pattern: 'Zip code should be a number',
      minlength: 'Length of Zip code should be 5 characters',
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
    private toastr: ToastrService,
    private router: Router,
    private _snackBar: MatSnackBar
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
      ])
    ),
    email: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    gender: this.builder.control('', Validators.required),
    phoneNumber: this.builder.control(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(/^01[0125](\-)?[0-9]{8}$/),
      ])
    ),
    dateOfBirth: this.builder.control('', Validators.required),
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
        Validators.minLength(5),
        Validators.maxLength(5),
      ])
    ),
    'address.street': this.builder.control(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(/^[a-zA-Z ]+$/),
      ])
    ),
  });

  getFile(event: any, element: HTMLSpanElement) {
    console.log(this.file);
    this.file = event.target.files[0];
    element.innerHTML = this.file.name;
  }

  proceedregister() {
    let rC = this;
    if (this.registerform.valid) {
      this.service.registerUser(this.registerform.value, this.file).subscribe({
        next() {
          rC.toastr.success(
            'Please contact admin for enable access.',
            'Registered successfully'
          );
          rC.router.navigate(['login']);
        },
        error(err) {
          rC._snackBar.open(err.error.message, '', {
            duration: 3000,
          });
        },
      });
    } else {
      rC._snackBar.open('Please enter valid data', '', {
        duration: 3000,
      });
    }
  }
}
