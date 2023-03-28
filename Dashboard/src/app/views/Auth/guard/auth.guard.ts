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
import { AuthService } from '../../../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private service: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.service.isLoggedIn()) {
      if (route.url.length > 0) {
        if (this.service.getRole() == 'admin') {
          return true;
        } else {
          this.router.navigate(['']);
          this.snackBar.open('You dont have access.Please login first', 'Close', {
            duration: 3000
          });
          return false;
        }
      } else {
        return true;
      }
    } else {
      this.router.navigate(['login']);
      this.snackBar.open('You dont have access.Please login first', 'Close', {
        duration: 3000
      });
      return false;
    }
  }
}
