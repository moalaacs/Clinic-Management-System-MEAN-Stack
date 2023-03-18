import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { ClinicService } from 'src/app/service/clinic.service';
import { MyErrorStateMatcher } from 'src/app/class/ErrorStateMatcher';
@Component({
  selector: 'app-add-clinic',
  templateUrl: './add-clinic.component.html',
  styleUrls: ['./add-clinic.component.css']
})


export class AddClinicComponent implements OnInit {
  clinicAddForm: FormGroup;
  availableSpecilization: string[];
  matcher: MyErrorStateMatcher;
  constructor(private fb: FormBuilder, private clinicService: ClinicService, private route: Router) {
    this.availableSpecilization = [];
    this.clinicAddForm = this.fb.group({
      speciality: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern("01[0125](\-)?[0-9]{8}")]],
      address: this.fb.group({
        city: ['', [Validators.required, Validators.pattern("[a-zA-Z]{3,}")]],
        street: ['', [Validators.required, Validators.pattern("[a-zA-Z]{3,}")]],
        country: ['', [Validators.required, Validators.pattern("[a-zA-Z]{3,}")]],
        zipCode: ['', [Validators.required, Validators.pattern("[0-9]{5}")]],
      })
    })
    this.matcher = new MyErrorStateMatcher();
  }
  ngOnInit() {
    this.clinicService.getPublicAvailableSpecilization().subscribe((data) => this.availableSpecilization = data);
  }
  get speciality() {
    return this.clinicAddForm.get('speciality');
  }
  get phone() {
    return this.clinicAddForm.get('phone');
  }
  get email() {
    return this.clinicAddForm.get('email');
  }
  get addressStreet() {
    return this.clinicAddForm.get('address')?.get("street");
  }
  get addressCity() {
    return this.clinicAddForm.get('address')?.get("city");
  }
  get addressCountry() {
    return this.clinicAddForm.get('address')?.get("country");
  }
  get addressZipCode() {
    return this.clinicAddForm.get('address')?.get("zipCode");
  }
  addClinic(errorH5: HTMLElement) {
    errorH5.innerHTML = '';
    let Router = this.route;
    this.clinicService.addClinic(this.clinicAddForm.value).subscribe({
      next(value) {
        console.log(value);
        alert("Success");
        Router.navigateByUrl("clinic");
      },
      error(err) {
        errorH5.innerHTML = err.error.message;
      },
    });
  }
}
