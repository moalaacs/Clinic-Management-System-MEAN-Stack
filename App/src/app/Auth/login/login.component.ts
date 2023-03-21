import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'

import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router
  ) {
    sessionStorage.clear();
  }
  token: any;

  loginform = this.builder.group({
    email: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.email])
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
  });

  proceedlogin() {
    if (this.loginform.valid) {
      this.service.loginUser(this.loginform.value).subscribe((_token) => {
        this.token = _token;
        if (this.token) {
          sessionStorage.setItem('token', this.token.token);
          this.router.navigate(['']);
        } else {
          this.toastr.error('Invalid credentials');
        }
      });
    } else {
      this.toastr.warning('Please enter valid data.');
    }
  }
}
