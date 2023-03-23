import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Doctor } from '../models/doctor';
import { Employee } from '../models/employee';
import { Patient } from '../models/patient';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:  any;
  role: string = "employee";
  id: number = 1000;

  constructor(private authService: AuthService, private userService: UserService<Patient>) {
    this.role = this.authService.getRole();
    this.id = this.authService.getID();
  }

  ngOnInit() {
    this.userService.getUserById(this.role, this.id).pipe(map(response=>response.data)).subscribe(
      data => {
        this.user = data;
      }
    );
  }

  Edit(){

  }

}
