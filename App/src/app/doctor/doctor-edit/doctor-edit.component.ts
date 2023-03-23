import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-doctor-edit',
  templateUrl: './doctor-edit.component.html',
  styleUrls: ['./doctor-edit.component.css']
})
export class DoctorEditComponent  implements OnInit {

    doctorForm: FormGroup;
    doctorId: number = 0;
    doctor: any = null ;

    minDate: Date;
    maxDate: Date;
    defaultDate: Date;


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

    constructor(private fb: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private doctorService: DoctorService,
      private snackBar: MatSnackBar,
      private location: Location
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
      }

    onSubmit(): void {
      const date = new Date(this.doctorForm.value.dateOfBirth);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear().toString();
      const formattedDate = `${day}/${month}/${year}`;
      this.doctorForm.value.dateOfBirth = formattedDate;
      const formData = new FormData();
      if (this.doctorForm.value.image) {
        formData.append('photo', this.doctorForm.value.image);
      }
      formData.append('data', this.doctorForm.value);

      const doctor = this.doctorForm.value;
      const savedDoctor: Observable<any> = this.doctorService.patchDoctorById(this.doctorId, doctor)
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
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            const photoDataUrl: string = reader.result as string;
            this.doctor.get('photo')?.setValue(photoDataUrl);
          };
        }
      }

      goBack() {
        this.location.back();
      }



}
