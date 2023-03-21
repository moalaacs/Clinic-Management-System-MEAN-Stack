import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

  employeeForm: FormGroup;
  employeeId: number = 0;
  employee: any = null ;

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
    salary: {
      pattern: 'Salary should be a number'
    },
    workingHours: {
      pattern: 'Working hours should be a number'
    },
    role: {
      pattern: 'Role should be a string'
    }
  };

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private employeeService: EmployeeService,
              private snackBar: MatSnackBar,
              ) {

    this.minDate = new Date('1963-01-01');
    this.maxDate = new Date('2000-12-31');
    this.defaultDate = new Date('1999-01-10');

    this.employeeForm = this.fb.group({
      firstname: ['',[Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]+$')]],
      lastname: ['',[Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]+$')]],
        gender: [''],
      phoneNumber: ['',[ Validators.pattern(/^\d+$/)]],
      email: ['', [ Validators.email]],
      address: this.fb.group({
        street: ['', [
          Validators.minLength(2),
          Validators.pattern('^[a-zA-Z0-9\\s.-]+$')
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
      password: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(7)]],
      image: [''],
      medicalHistory: '',
      invoices: [],
      clinicId: ['', Validators.pattern(/^\d+$/)],
      salary: ['', Validators.pattern(/^\d+$/)],
      workingHours: ['', Validators.pattern(/^\d+$/)],
      role: ['', Validators.pattern('^[a-zA-Z]+$')]
    });
  }

  ngOnInit(): void {
    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));
    this.employeeService.getEmployeeById(this.employeeId).pipe(
      map(response => response.data)).subscribe(
      data => {
        let clinicId = data.clinicId._id;
        data.clinicId = clinicId;
        let date = new Date(data.dateOfBirth);
        data.dateOfBirth = date;
        this.employee = data;

        this.employeeForm.patchValue(data);

      });
  }

  onSubmit(): void {
    const date = new Date(this.employeeForm.value.dateOfBirth);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    const formattedDate = `${day}/${month}/${year}`;
    this.employeeForm.value.dateOfBirth = formattedDate;

    const formData = new FormData();
    if (this.employeeForm.value.image) {
      formData.append('photo', this.employeeForm.value.image);
    }
    formData.append('data', this.employeeForm.value);

    const employee = this.employeeForm.value;
    const savedEmployee: Observable<any> = this.employeeService.patchEmployeeById(this.employeeId, employee)
    savedEmployee.subscribe(
      data => {
        this.snackBar.open('Employee updated successfully', 'Close', {
          duration: 3000
        });
        this.router.navigate(['/employee']);},
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
          this.employeeForm.get('photo')?.setValue(photoDataUrl);
        };
      }
    }

    goBack() {
      this.router.navigate(['/employee']);
    }

}
