import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-signIn',
  templateUrl: './signIn.component.html',
  styleUrls: ['./signIn.component.css']
})
export class SignInComponent implements OnInit {


    email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit() {
  }
  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        const token = response.token;
        localStorage.setItem('token', token);
        this.router.navigate(['/home']);
      },
      (error) => {
        this.errorMessage = error.error.message;
      }
    );
  }

}


