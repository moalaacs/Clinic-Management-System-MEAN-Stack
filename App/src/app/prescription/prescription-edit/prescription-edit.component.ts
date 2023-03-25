import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Prescription } from 'src/app/models/prescription';
import { prescriptionService } from 'src/app/services/prescription.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-prescription-edit',
  templateUrl: './prescription-edit.component.html',
  styleUrls: ['./prescription-edit.component.css']
})
export class PrescriptionEditComponent {
  constructor(
    public prescriptionService: prescriptionService,
    private builder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute:ActivatedRoute
  ) {}

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
      Validators.compose([Validators.required, Validators.minLength(5)])
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
  removeMedications(i:Required<number>){
    this.prescriptionform.controls['medicine'].removeAt(i);
 }
  get medicine() {
    return this.prescriptionform.controls['medicine'] as FormArray;
  }

  
  goBack(): void {
    this.router.navigate(['/prescription']);
  }
  save(){
    this.activatedRoute.params.subscribe(parameters=>{
      this.prescriptionService.updatePrescriptions(parameters['id'],this.prescriptionform.value).subscribe(()=>{
        this.router.navigateByUrl("/prescription");
      });
    })
    
    
  }
}
