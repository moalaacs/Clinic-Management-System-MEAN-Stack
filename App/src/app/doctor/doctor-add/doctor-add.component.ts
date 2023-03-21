import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';


import { Doctor } from '../../models/doctor';
import { DoctorService } from '../../services/doctor.service';
@Component({
  selector: 'app-doctor-add',
  templateUrl: './doctor-add.component.html',
  styleUrls: ['./doctor-add.component.css']
})
export class DoctorAddComponent implements OnInit {

  doctorForm: FormGroup = new FormGroup({});

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

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private doctorService: DoctorService,
    private snackBar: MatSnackBar,
    ) {

      this.minDate = new Date('1963-01-01');
      this.maxDate = new Date('2000-12-31');
      this.defaultDate = new Date('1999-01-10');

      this.doctorForm = this.fb.group({
        firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3)]],
        lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3)]],
        dateOfBirth: ['', [Validators.required, Validators.pattern('^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[0-9]{4}$')]],
        gender: [''],
        phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]*')]],
        email: ['', [Validators.required, Validators.email]],
        address: this.fb.group({
          street: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2)]],
          city: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3)]],
          country: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2)]],
          zipCode: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(5)]]
        }),
        password: ['', [
          Validators.required,
          Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\\-=[\\]{};\'\\:"|,.<>\\/?]).{7,}$'),
          Validators.minLength(8)
        ]],
              image: [''],
        medicalHistory: '',
        invoices: [],

        schedule: this.fb.group({
          monday: this.fb.group({
            start: [null],
            end: [null]
          }),
          tuesday: this.fb.group({
            start: [null],
            end: [null]
          }),
          wednesday: this.fb.group({
            start: [null],
            end: [null]
          }),
          thursday: this.fb.group({
            start: [null],
            end: [null]
          }),
          friday: this.fb.group({
            start: [null],
            end: [null]
          }),
          saturday: this.fb.group({
            start: [null],
            end: [null]
          }),
          sunday: this.fb.group({
            start: [null],
            end: [null]
          })
        }),
        clinicId: ['', [Validators.required, Validators.pattern('[0-9]*')]],
        speciality: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3)]]
      });


    }

  ngOnInit(): void {

      }


      onSubmit() {
        const date = new Date(this.doctorForm.value.dateOfBirth);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        const formattedDate = `${day}/${month}/${year}`;
        this.doctorForm.value.dateOfBirth = formattedDate;

        const doctor = this.doctorForm.value;
        this.doctorService.addDoctor(doctor).subscribe(
          () => this.router.navigate(['/doctor']))
      }

      onFileSelected(event: any) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.doctorForm.patchValue({
            image: reader.result as string
          });
        };
      }

      goBack(): void {
        this.router.navigate(['/doctor']);
      }
    }
