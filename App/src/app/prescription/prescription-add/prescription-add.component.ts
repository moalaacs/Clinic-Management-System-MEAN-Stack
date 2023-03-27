import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { prescriptionService } from 'src/app/services/prescription.service';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { clinic } from 'src/app/models/clinic';
import { Doctor } from 'src/app/models/doctor';
import { ClinicService } from 'src/app/services/clinic.service';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-prescription-add',
  templateUrl: './prescription-add.component.html',
  styleUrls: ['./prescription-add.component.css'],
})
export class PrescriptionAddComponent {
  clinics: clinic[] = [];
  clinicID: number = 0;
  doctorsInClinic: number[] = [];
  validationMessages = {
    clinic: {
      required: 'Clinic is required.',
    },
    doctor: {
      required: 'Doctor is required.',
    },
    patient: {
      required: 'Patient Id is required.',
      pattern: 'Patient Id should be a number',
    },
    instructions: {
      minlength: 'Instructions should have a minimum length of 5 characters',
    },
    name: {
      required: 'medicine name is required.',
      pattern: 'medicine name should be a string. ',
    },
    type: {
      required: 'medicine type is required.',
      pattern:
        'Medication type must be either syrup, tablet, capsule, or injection',
    },
    dose: {
      required: 'medicine dose is required.',
      pattern: 'medicine dose should be a string',
    },
    frequency: {
      required: 'medicine frequency is required.',
      pattern: 'medicine frequency should be a string',
    },
  };
  constructor(
    public prescriptionService: prescriptionService,
    private builder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    public clinicservice: ClinicService,
    public doctorservice: DoctorService
  ) {
    this.clinicservice.getClinics().subscribe((clincsArray) => {
      this.clinics = clincsArray.data;
    });
  }

  prescriptionform = this.builder.group({
    clinic: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])
    ),
    patient: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])
    ),
    doctor: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])
    ),
    medicine: this.builder.array([this.medicationsForm()]),
    instructions: this.builder.control(
      '',
      Validators.compose([Validators.minLength(5)])
    ),
  });

  medicationsForm() {
    return this.builder.group({
      name: this.builder.control(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[a-zA-Z ]+$/),
        ])
      ),
      dose: this.builder.control(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[a-zA-Z ]+$/),
        ])
      ),
      frequency: this.builder.control(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[a-zA-Z ]+$/),
        ])
      ),
      type: this.builder.control('', Validators.required),
    });
  }

  addMedications() {
    this.prescriptionform.controls['medicine'].push(this.medicationsForm());
  }
  removeMedications(i: Required<number>) {
    this.prescriptionform.controls['medicine'].removeAt(i);
  }
  get medicine() {
    return this.prescriptionform.controls['medicine'] as FormArray;
  }

  save() {
    if (this.prescriptionform.valid) {
      this.prescriptionService
        .addPrescriptions(this.prescriptionform.value)
        .subscribe(() => {
          this.router.navigate(['prescription']);
          this.toastr.success('prescription added successfully.');
        });
    } else {
      this.toastr.warning('Please enter valid data.');
    }
  }
  goBack(): void {
    this.router.navigate(['/prescription']);
  }
  getClinic(id: string) {
    this.clinicID = parseInt(id);
    this.clinicservice
      .getClinicById(this.clinicID)
      .subscribe((currentClinic) => {
        this.doctorsInClinic = currentClinic.data._doctors;
      });
  }
}
