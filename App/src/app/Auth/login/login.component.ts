import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private router: Router,
    private snackBar: MatSnackBar
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
      this.service.loginUser(this.loginform.value).subscribe((data) => {
        if (data.hasOwnProperty("token")) {
          this.token = data;
          sessionStorage.setItem('token', this.token.token);
          this.snackBar.open('Login to System successfully.', 'Close', {
            duration: 3000
          });
          this.router.navigate(['']);
        } else {
          this.snackBar.open('Invalid credentials', 'Close', {
            duration: 3000
          });
        }
      });
    } else {
      this.toastr.warning('Please enter valid data.');
    }
  }
}
