import { Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
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

  employeeId: number = 0;
  employee: any = null ;
  updatedEmployee: any = {};
  employeeForm: FormGroup;

  minDate: Date;
  maxDate: Date;
  defaultDate: Date;
  image: any;


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
              private employeeService: EmployeeService,
              private snackBar: MatSnackBar,
              private location: Location
              ) {

    this.minDate = new Date('1963-01-01');
    this.maxDate = new Date('1999-12-31');
    this.defaultDate = new Date('1999-01-10');

    this.employeeForm = this.fb.group({
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
      password: [''],
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
        data.clinicId = data.clinicId._id;
        let date = new Date(data.dateOfBirth);
        data.dateOfBirth = date;
        this.employee = data;
        this.employeeForm.patchValue(this.employee);
      });

      this.employeeForm.controls['firstname'].valueChanges.subscribe((value)=> {
        if (value !== this.employee.firstname) {
          this.updatedEmployee.firstname = value;
        }
      });

      this.employeeForm.controls['lastname'].valueChanges.subscribe((value) => {
        if (value !== this.employee.lastname) {
          this.updatedEmployee.lastname = value;
        }
      });
      this.employeeForm.controls['dateOfBirth'].valueChanges.subscribe((value) => {
        if (value !== this.employee.dateOfBirth && value != null) {
          const date = new Date(value);
          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const year = date.getFullYear().toString();
          const formattedDate = `${day}/${month}/${year}`;
          this.updatedEmployee.dateOfBirth = formattedDate;
        }
      });
      this.employeeForm.controls['gender'].valueChanges.subscribe((value) => {
        if (value !== this.employee.gender) {
          this.updatedEmployee.gender = value;
        }
      });
      this.employeeForm.controls['phoneNumber'].valueChanges.subscribe((value) => {
        if (value !== this.employee.phoneNumber) {
          this.updatedEmployee.phoneNumber = value;
        }
      });
      this.employeeForm.controls['email'].valueChanges.subscribe((value) => {
        if (value !== this.employee.email) {
          this.updatedEmployee.email = value;
        }
      });
      this.employeeForm.controls['address'].valueChanges.subscribe((value) => {
        if (JSON.stringify(value) !== JSON.stringify(this.employee.address)) {
          this.updatedEmployee.address = value;
        }
      });
      this.employeeForm.controls['password'].valueChanges.subscribe((value) => {
        if (value !== this.employee.password) {
          this.updatedEmployee.password = value;
        }
      });
      this.employeeForm.controls['image'].valueChanges.subscribe((value) => {
        if (value !== this.employee.image) {
          this.updatedEmployee.image = value;
        }
      });
      this.employeeForm.controls['medicalHistory'].valueChanges.subscribe((value) => {
        if (value !== this.employee.medicalHistory) {
          this.updatedEmployee.medicalHistory = value;
        }
      });
      this.employeeForm.controls['invoices'].valueChanges.subscribe((value) => {
        if (value.length !== this.employee.invoices.length) {
          this.updatedEmployee.invoices = value;
        }
        else {
          for (let i = 0; i < value.length; i++) {
            if (value[i] !== this.employee.invoices[i]) {
              this.updatedEmployee.invoices = value;
            }
          }
        }
        });

      this.employeeForm.controls['clinicId'].valueChanges.subscribe((value) => {
        if (value !== this.employee.clinicId) {
          this.updatedEmployee.clinicId = value;
        }
      });
      this.employeeForm.controls['salary'].valueChanges.subscribe((value) => {
        if (value !== this.employee.salary) {
          this.updatedEmployee.salary = value;
        }
      });
      this.employeeForm.controls['workingHours'].valueChanges.subscribe((value) => {
        if (value !== this.employee.workingHours) {
          this.updatedEmployee.workingHours = value;
        }
      });
      this.employeeForm.controls['role'].valueChanges.subscribe((value) => {
        if (value !== this.employee.role) {
          this.updatedEmployee.role = value;
        }
      });
  }


  onSubmit(): void {
    const savedEmployee: Observable<any> = this.employeeService.patchEmployeeById(this.employeeId, this.updatedEmployee, this.image)
    savedEmployee.subscribe(
      data => {
        this.snackBar.open('Employee updated successfully', 'Close', {
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
