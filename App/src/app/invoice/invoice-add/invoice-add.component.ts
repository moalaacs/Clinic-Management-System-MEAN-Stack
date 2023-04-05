import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { clinic } from 'src/app/models/clinic';
import { Invoice } from 'src/app/models/invoice';
import { ClinicService } from 'src/app/services/clinic.service';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-invoice-add',
  templateUrl: './invoice-add.component.html',
  styleUrls: ['./invoice-add.component.css']
})
export class InvoiceAddComponent implements OnInit {
  invoices: Invoice[] = [];
  clinics: clinic[] = [];
  clinicID: number = 0;
  doctorsInClinic: {id:number,firstname:string,lastname:string}[] = [];
  constructor(
    public invoiceService: InvoiceService,
    public clinicservice:ClinicService,
    private builder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}
  ngOnInit(): void {
    this.clinicservice.getClinics().subscribe((clincsArray) => {
      this.clinics = clincsArray.data;
    });
  }

  invoiceForm = this.builder.group({
    patientId: this.builder.control(
      '',
      Validators.compose([Validators.required])
    ),
    patientType: this.builder.control(
      '',
      Validators.compose([Validators.required])
    ),
    clinicId: this.builder.control(
      '',
      Validators.compose([Validators.required])
    ),
    paymentMethod: this.builder.control(
      '',
      Validators.compose([Validators.required])
    ),
    paid: this.builder.control(
      '',
      Validators.compose([Validators.required])
    ),
    services: this.builder.array([this.servicesForm()]),
  });

  servicesForm() {
    return this.builder.group({
      name: this.builder.control(
        '',
        Validators.compose([
          Validators.required,
        ])
      ),
      additionalCosts: this.builder.control(
        '',
        Validators.compose([
          Validators.required,
        ])
      ),
      notes: this.builder.control(
        '',
        Validators.compose([
          Validators.required,
        ])
      ),
    });
  }

  addServices() {
    this.invoiceForm.controls['services'].push(this.servicesForm());
  }
  removeServices(i: Required<number>) {
    this.invoiceForm.controls['services'].removeAt(i);
  }
  get services() {
    return this.invoiceForm.controls['services'] as FormArray;
  }

  save() {
    if (this.invoiceForm.valid) {
      this.invoiceService
        .addInvoice(this.invoiceForm.value)
        .subscribe(
          () => {
            this.snackBar.open('invoice added successfully.', 'Close', {
              duration: 3000,
            });
            this.router.navigate(['invoice']);
          },
          (error) => {
            this.snackBar.open(error.message, 'Close', {
              duration: 3000,
            });
          }
        );
    } else {
      this.snackBar.open('Please enter valid data.', 'Close', {
        duration: 3000,
      });
    }
  }
  goBack(): void {
    this.router.navigate(['/invoice']);
  }
  getClinic(id: string) {
    this.clinicservice
      .getClinicById(parseInt(id))
      .subscribe((currentClinic) => {
        this.doctorsInClinic = currentClinic.data._doctors
      });
  }
}
