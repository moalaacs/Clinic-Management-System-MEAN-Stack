import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../_services/auth.service';

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
  decodedToken: any;
  helper = new JwtHelperService();

  loginform = this.builder.group({
    email: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
  });

  proceedlogin() {
    if (this.loginform.valid) {
      console.log(this.loginform.value);
      this.service.LoginUser(this.loginform.value).subscribe((_token) => {
        this.token = _token;
        console.log(this.token);
        this.decodedToken = this.helper.decodeToken(this.token.token);
        console.log(this.decodedToken);
        if (this.token) {
          sessionStorage.setItem('email', this.decodedToken.email);
          sessionStorage.setItem('role', this.decodedToken.role);
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
