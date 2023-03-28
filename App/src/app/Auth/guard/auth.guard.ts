import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private service: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.service.isLoggedIn()) {
      if (route.url.length > 0) {
        let menu = document.location.pathname;
        if (
          (
            menu == 'pay' ||
            menu == 'doctor' ||
            menu == 'doctor/add' ||
            menu == 'doctor/edit/:id' ||
            menu == 'doctor/details/:id' ||
            menu == 'emplyee' ||
            menu == 'emplyee/add' ||
            menu == 'employee/edit/:id' ||
            menu == 'employee/details/:id' ||
            menu == 'patient' ||
            menu == 'patient/add' ||
            menu == 'patient/edit/:id') ||
            menu == 'patient/details/:id' ||
            menu == 'clinic' ||
            menu == 'clinic/add' ||
            menu == 'clinic/edit/:id' ||
            menu == 'clinic/details/:id'||
            menu == 'clinic/location/:speciallity'||
            menu == 'medicine' ||
            menu == 'medicine/add' ||
            menu == 'medicine/edit/:id' ||
            menu == 'medicine/details/:id'||
            menu == 'appointment' ||
            menu == 'appointment/add' ||
            menu == 'appointment/edit/:id' ||
            menu == 'appointment/details/:id'||
            menu == 'prescription' ||
            menu == 'prescription/add' ||
            menu == 'prescription/edit/:id' ||
            menu == 'prescription/details/:id' ||
            menu == 'prescription' 
             &&
          this.service.getRole() == 'admin'
        ) {
          return true;
        } else {
          this.router.navigate(['']);
          this.snackBar.open('You dont have access.', 'Close', {
            duration: 3000,
          });
          return false;
        }
      } else {
        return true;
      }
    } else {
      this.router.navigate(['login']);
      this.snackBar.open('Please login first', 'Close', {
        duration: 3000,
      });
      return false;
    }
  }
}
