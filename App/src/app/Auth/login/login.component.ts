import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { JwtHelperService } from '@auth0/angular-jwt';

import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  hide  = true;
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router
  ) {
    sessionStorage.clear();
  }
  token: any;
  helper = new JwtHelperService();
  decodedToken:any;

  loginform = this.builder.group({
    email: this.builder.control(
      '',
      Validators.compose([Validators.required/*, Validators.email*/])
    ),
    password: this.builder.control(
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(8)
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
