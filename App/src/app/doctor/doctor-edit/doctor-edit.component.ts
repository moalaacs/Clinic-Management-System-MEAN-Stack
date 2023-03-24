import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-doctor-edit',
  templateUrl: './doctor-edit.component.html',
  styleUrls: ['./doctor-edit.component.css']
})
export class DoctorEditComponent implements OnInit {

  doctorId: number = 0;
  doctor: any = null;
  updatedDoctor: any = {};


  minDate: Date;
  maxDate: Date;
  defaultDate: Date;
  image: any;

  weeklyDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]


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
      pattern: 'Contact number should be a number'
    },
    email: {
      email: 'Email should be in the form example@example.com'
    },
    address: {
      street: {
        pattern: 'Street should be a string',
        minlength: 'Length of street should be greater than 2 characters'
      },
      city: {
        pattern: 'City should be a string',
        minlength: 'Length of street should be greater than 3 characters'
      },
      country: {
        pattern: 'Country should be a string',
        minlength: 'Length of street should be greater than 2 characters'
      },
      zipCode: {
        pattern: 'Zip code should be a number',
        minlength: 'Length of Zip code should be 5 characters'
      }
    },
    password: {
      pattern: 'Password should be a string',
      minlength: 'Length of password should be greater than 7 characters'
    },
    clinicId: {
      pattern: 'Clinic Id should be a number'
    },
    speciality: {
      pattern: 'Specialization should be a string',
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
    private route: ActivatedRoute,
    private router: Router,
    private doctorService: DoctorService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {
    this.minDate = new Date('1963-01-01');
    this.maxDate = new Date('2000-12-31');
    this.defaultDate = new Date('1999-01-10');
  }
  doctorForm = this.fb.group({
    firstname: ['', [Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3)]],
    lastname: ['', [Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3)]],
    dateOfBirth: [''],
    gender: [''],
    phoneNumber: ['', [Validators.pattern('[0-9]*')]],
    email: ['', [Validators.email]],
    address: this.fb.group({
      street: ['', [Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2)]],
      city: ['', [Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3)]],
      country: ['', [Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2)]],
      zipCode: ['', [Validators.pattern('[0-9]*'), Validators.minLength(5)]]
    }),
    password: ['', [

      Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\\-=[\\]{};\'\\:"|,.<>\\/?]).{7,}$'),
      Validators.minLength(8)
    ]],
    image: [''],
    medicalHistory: '',
    invoices: [],
    schedule: this.fb.array([this.scheduleForm()]),
    clinicId: ['', [Validators.pattern('[0-9]*')]],
    speciality: ['']
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
    this.doctorId = Number(this.route.snapshot.paramMap.get('id'));
    this.doctorService.getDoctorById(this.doctorId).pipe(
      map(response => response.data)).subscribe(
        (data) => {
          data.clinicId = data.clinicId._id;
          let date = new Date(data.dateOfBirth);
          data.dateOfBirth = date;
          this.doctor = data;
          this.doctorForm.patchValue(this.doctor);
        }
      );
    this.doctorForm.controls['firstname'].valueChanges.subscribe((value) => {
      if (value !== this.doctor.firstname) {
        this.updatedDoctor.firstname = value;
      }
    });
    this.doctorForm.controls['lastname'].valueChanges.subscribe((value) => {
      if (value !== this.doctor.lastname) {
        this.updatedDoctor.lastname = value;
      }
    });
    this.doctorForm.controls['dateOfBirth'].valueChanges.subscribe((value) => {
      if (value !== this.doctor.dateOfBirth && value != null) {
        const date = new Date(value);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        const formattedDate = `${day}/${month}/${year}`;
        this.updatedDoctor.dateOfBirth = formattedDate;
      }
    });
    this.doctorForm.controls['gender'].valueChanges.subscribe((value) => {
      if (value !== this.doctor.gender) {
        this.updatedDoctor.gender = value;
      }
    });
    this.doctorForm.controls['phoneNumber'].valueChanges.subscribe((value) => {
      if (value !== this.doctor.phoneNumber) {
        this.updatedDoctor.phoneNumber = value;
      }
    });
    this.doctorForm.controls['email'].valueChanges.subscribe((value) => {
      if (value !== this.doctor.email) {
        this.updatedDoctor.email = value;
      }
    });
    this.doctorForm.controls['address'].valueChanges.subscribe((value) => {
      if (value !== this.doctor.address) {
        this.updatedDoctor.address = value;
      }
    });
    this.doctorForm.controls['password'].valueChanges.subscribe((value) => {
      if (value !== this.doctor.password) {
        this.updatedDoctor.password = value;
      }
    });
    this.doctorForm.controls['image'].valueChanges.subscribe((value) => {
      if (value !== this.doctor.image) {
        this.updatedDoctor.image = value;
      }
    });
    this.doctorForm.controls['medicalHistory'].valueChanges.subscribe((value) => {
      if (value !== this.doctor.medicalHistory) {
        this.updatedDoctor.medicalHistory = value;
      }
    });
    this.doctorForm.controls['invoices'].valueChanges.subscribe((value) => {
      if (value !== this.doctor.invoices) {
        this.updatedDoctor.invoices = value;
      }
    });
    this.doctorForm.controls['schedule'].valueChanges.subscribe((value) => {
      if (value !== this.doctor.schedule) {
        this.updatedDoctor.schedule = value;
      }
    });
    this.doctorForm.controls['clinicId'].valueChanges.subscribe((value) => {
      if (value !== this.doctor.clinicId) {
        this.updatedDoctor.clinicId = value;
      }
    });
    this.doctorForm.controls['speciality'].valueChanges.subscribe((value) => {
      if (value !== this.doctor.speciality) {
        this.updatedDoctor.speciality = value;
      }
    });
  }

  addDay() { }

  onSubmit(): void {
    const savedDoctor: Observable<any> = this.doctorService.patchDoctorById(this.doctorId, this.updatedDoctor, this.image)
    savedDoctor.subscribe(
      data => {
        this.snackBar.open('Doctor updated successfully', 'Close', {
          duration: 3000
        });
        this.location.back();
      },
      error => {
        this.snackBar.open(error.message, 'Close', {
          duration: 3000
        });
      }
    );
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.image = file;
    }
  }

  goBack() {
    this.location.back();
  }
}
