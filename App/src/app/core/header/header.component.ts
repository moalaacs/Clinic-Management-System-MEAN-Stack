import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { logoutConfirmation } from 'src/app/shared/logout-confirmation.component';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  isLoggedIn = false;
  role: string;
  userProfileImage: string;
  userName: string;
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav | undefined;
  constructor(public authService: AuthService, public router: Router, public dialog: MatDialog,
    private patientService: PatientService, private doctorService: DoctorService, private employeeService: EmployeeService) {
    this.role = "";
    this.userProfileImage = "";
    this.userName = "";
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(logoutConfirmation, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe(data => { if (data) this.logOut() });

  }
  logOut() {
    sessionStorage.clear();
    this.isLoggedIn = false;
    this.router.navigate(['']);
  }
  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      let bindedThis = this;
      this.isLoggedIn = true;
      this.role = this.authService.getRole();
      let userId = this.authService.getID();
      switch (this.authService.getRole()) {
        case "admin": {
          bindedThis.userProfileImage = "images\\admin.jpeg"
          bindedThis.userName = "Admin";
          break;
        }
        case "patient": {
          bindedThis.patientService.getPatientById(userId).subscribe(data => {
            bindedThis.userProfileImage = data.data.image;
            bindedThis.userName = data.data.firstname;
          });
          break;
        }
        case "employee": {
          bindedThis.employeeService.getEmployeeById(userId).subscribe(data => {
            bindedThis.userProfileImage = data.data.image;
            bindedThis.userName = data.data.firstname;
          });
          break;
        }
        case "doctor": {
          bindedThis.doctorService.getDoctorById(userId).subscribe(data => {
            bindedThis.userProfileImage = data.data.image;
            bindedThis.userName = data.data.firstname;
          });
          break;
        }
      }

    }
  }
}
