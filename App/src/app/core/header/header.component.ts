import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { logoutConfirmation } from 'src/app/shared/logout-confirmation.component';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  isLoggedIn = false;
  role: string;
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav | undefined;


  constructor(public authService: AuthService, public router: Router, public dialog: MatDialog) {
    this.role = "";
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
      this.isLoggedIn = true;
      this.role = this.authService.getRole();
    }
  }
}
