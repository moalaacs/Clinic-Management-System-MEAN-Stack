import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ADDRESS } from './../../models/Address';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  file: any;
  addresses = ADDRESS;
  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  registerform = this.builder.group({
    firstname: this.builder.control(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(/^[a-zA-Z ]+$/),
      ])
    ),
    lastname: this.builder.control(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(/^[a-zA-Z ]+$/),
      ])
    ),
    password: this.builder.control(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),
      ])
    ),
    email: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    gender: this.builder.control('',Validators.required),
    phone: this.builder.control(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(/^01[0125](\-)?[0-9]{8}$/),
      ])
    ),
    dateOfBirth: this.builder.control('', Validators.required),
    'address.city': this.builder.control(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(/^[a-zA-Z ]+$/),
      ])
    ),
    'address.country': this.builder.control(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(/^[a-zA-Z ]+$/),
      ])
    ),
    'address.zipCode': this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.minLength(5),Validators.maxLength(5)])
    ),
    'address.street': this.builder.control('', Validators.required),
  });

  getFile(event: any) {
    this.file = event.target.files[0];
  }

  proceedregister() {
    if (this.registerform.valid) {
      this.service
        .registerUser(this.registerform.value, this.file)
        .subscribe(() => {
          this.toastr.success(
            'Please contact admin for enable access.',
            'Registered successfully'
          );
          this.router.navigate(['login']);
        });
    } else {
      this.toastr.warning('Please enter valid data.');
    }
  }
}
