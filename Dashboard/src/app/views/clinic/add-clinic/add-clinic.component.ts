import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { ClinicService } from 'src/app/services/clinic.service';
import { MyErrorStateMatcher } from 'src/app/models/ErrorStateMatcher';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-clinic',
  templateUrl: './add-clinic.component.html',
  styleUrls: ['./add-clinic.component.css']
})

export class AddClinicComponent implements OnInit {
  clinicAddForm: FormGroup;
  availableSpecilization: string[];
  matcher: MyErrorStateMatcher;
  editFlag: boolean;
  updatedClinic: any;
  constructor(private fb: FormBuilder,
    private clinicService: ClinicService,
    private route: Router,
    private activeRoute: ActivatedRoute,
    private snackbar: MatSnackBar
  ) {
    this.updatedClinic = null;
    this.editFlag = false;
    this.availableSpecilization = [];
    this.clinicAddForm = this.fb.group({
      speciality: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern("01[0125](\-)?[0-9]{8}")]],
      address: this.fb.group({
        city: ['', [Validators.required, Validators.pattern("[a-zA-Z]{3,}")]],
        street: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9\\s\\-#,./()\'\']*')]],
        country: ['', [Validators.required, Validators.pattern("[a-zA-Z]{3,}")]],
        zipCode: ['', [Validators.required, Validators.pattern("[0-9]{5}")]],
      })
    })
    this.matcher = new MyErrorStateMatcher();
  }
  ngOnInit() {
    let bindedThis = this;
    this.clinicService.getPublicAvailableSpecilization().subscribe((data) => this.availableSpecilization = data);
    if (this.activeRoute.snapshot.params["id"]) {
      this.editFlag = true;
      this.clinicService.getClinicById(this.activeRoute.snapshot.params["id"]).subscribe({
        next(value) {
          bindedThis.clinicAddForm.controls["speciality"].patchValue(value.data._specilization);
          bindedThis.clinicAddForm.controls["email"].patchValue(value.data._email);
          bindedThis.clinicAddForm.controls["phone"].patchValue(value.data._contactNumber);
          bindedThis.clinicAddForm.controls["address"].patchValue(value.data._address);
        },
        error(err) {
          console.log(err);
          bindedThis.snackbar.open("Something went wrong while fetching clinic data");
        },
      })
    }
    this.clinicAddForm.controls['speciality'].valueChanges.subscribe((value) => {
      if (value !== this.clinicAddForm.controls['speciality'].value)
        this.updatedClinic['speciality'] = value;
    });
    this.clinicAddForm.controls['email'].valueChanges.subscribe((value) => {
      if (value !== this.clinicAddForm.controls['email'].value)
        this.updatedClinic['email'] = value;
    });
    this.clinicAddForm.controls['phone'].valueChanges.subscribe((value) => {
      if (value !== this.clinicAddForm.controls['phone'].value)
        this.updatedClinic['phone'] = value;
    });
    this.clinicAddForm.controls['address'].valueChanges.subscribe((value) => {
      if (JSON.stringify(value) !== JSON.stringify(this.clinicAddForm.controls['address'].value)) {
        this.updatedClinic['address'] = value;
      }
    });
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
  addClinic() {
    let bindedThis = this;
    this.clinicService.addClinic(this.clinicAddForm.value).subscribe({
      next() {
        bindedThis.snackbar.open("Clinic added successfully");
        bindedThis.route.navigateByUrl("clinic");
      },
      error(err) {
        bindedThis.snackbar.open(err);
      },
    });
  }
  patchClinic() {
    let bindedThis = this;
    this.clinicService.patchClinicById(bindedThis.activeRoute.snapshot.params["id"], this.updatedClinic).subscribe({
      next() {
        bindedThis.snackbar.open("Clinic patched successfully");
        bindedThis.route.navigateByUrl("clinic");
      },
      error(err) {
        bindedThis.snackbar.open(err);
      },
    });
  }
}
