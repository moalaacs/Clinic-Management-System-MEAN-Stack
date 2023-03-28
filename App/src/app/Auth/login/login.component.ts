import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  validationMessages = {
    
    email: {
      required: 'Email is required.',
      email: 'Email should be in the form example@example.com',
    },
    password: {
      required: 'Password is required.',
      pattern: 'Password should be a string',
      minlength: 'Length of password should be greater than 8 characters',
    }
  };
  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    sessionStorage.clear();
  }
  token: any;
  helper = new JwtHelperService();

  loginform = this.builder.group({
    email: this.builder.control(
      '',
      Validators.compose([Validators.required/*,Validators.email*/])
    ),
    password: this.builder.control(
      '',
      Validators.compose([
        Validators.required,
        /*Validators.minLength(8)*/
      ])
    ),
  });

  proceedLogin() {
    if (this.loginform.valid) {
      this.service.loginUser(this.loginform.value).subscribe((data) => {
        if (data.hasOwnProperty("token")) {
          this.token = data;
          sessionStorage.setItem('token', this.token.token);
          this.snackBar.open('Login to system successfully.', 'Close', {
            duration: 3000
          });
          this.router.navigate(['']);
        } else {
          this.snackBar.open('Invalid credentials.', 'Close', {
            duration: 3000
          });
        }
      });
    } else {
      this.snackBar.open('Please enter valid data.', 'Close', {
        duration: 3000
      });
    }
  }
}
