import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(public authService: AuthService, public router: Router) {
    this.role = "";
  }
  logOut() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }
  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.role = this.authService.getRole();
    }
  }
}
