import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.css']
})
export class PatientEditComponent implements OnInit {

  patientForm: FormGroup;
  patientId: number = 0;
  patient: any = null ;
  minDate = new Date(1950, 0, 1);
  maxDate = new Date();
  defaultDate = new Date(2000, 0, 1);

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

  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private patientService: PatientService,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe
  ) {
    this.patientForm = this.fb.group({
      firstname: ['',[Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]+$')]],
      lastname: ['',[Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]+$')]],
      dateOfBirth: [''],
      gender: [''],
      phoneNumber: ['',[ Validators.pattern(/^\d+$/)]],
      email: ['', [ Validators.email]],
      address: this.fb.group({
        street: ['', [
          Validators.minLength(2),
          Validators.pattern('^[a-zA-Z0-9\\s]+$')
        ]],
        city: ['', [
          Validators.minLength(2),
          Validators.pattern('^[a-zA-Z\\s]+$')
        ]],
        country: ['', [
          Validators.minLength(2),
          Validators.pattern('^[a-zA-Z0-9\\s]+$')
        ]],
        zipCode:['', Validators.compose([
          Validators.minLength(5),
          Validators.maxLength(5),
          Validators.pattern(/^\d+$/),
        ])]
      }),
      password: [''],
      image: [''],
      medicalHistory: '',
      invoices: []
    });

  }

  ngOnInit(): void {
    this.patientId = Number(this.route.snapshot.paramMap.get('id'));
    this.patientService.getPatientById(this.patientId).pipe(
          map(response => response.data)).subscribe(data => {
          this.patient = data;
          this.patientForm.patchValue(data);
    });
  }

  onSubmit(): void {
    this.patientForm.value.dateOfBirth = this.datePipe.transform(this.patientForm.value.dateOfBirth, 'dd/MM/yyyy');
    const formData = new FormData();
    if (this.patientForm.value.image) {
      formData.append('photo', this.patientForm.value.image);
    }

    formData.append('data', this.patientForm.value);
    const patient = this.patientForm.value;
    const savePatient: Observable<any> = this.patientService.patchPatientById(this.patientId,patient, this.patientForm.value.image)
    savePatient.subscribe(
      (data) => {
        this.snackBar.open('Patient updated successfully.', 'Close', {
          duration: 3000
        });
        this.router.navigate(['/patient']);
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
        this.patientForm.get('photo')?.setValue(photoDataUrl);
      };
    }
  }

  goBack() {
    this.router.navigate(['/patient']);
  }

}
