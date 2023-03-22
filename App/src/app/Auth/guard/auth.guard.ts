import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private service: AuthService,
    private router: Router,
    private tostr: ToastrService
  ) { }
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
        //console.log(route.url);
        //let menu = route.url[0].path;
        //let menu =document.location.href;
        let menu = document.location.pathname;
        if (
          (menu == '/doctor/add' ||
            menu == '/doctor/edit/:id' ||
            menu == 'emplyee/add' ||
            menu == 'employee/edit/:id' ||
            menu == 'doctor/add' ||
            menu == 'doctor/edit/:id') &&
          this.service.getRole() == 'admin'
        ) {
          return true;
        } else if (
          (menu == '/patient' || menu == '/patient/details/:id') &&
          this.service.getRole() == 'patient'
        ) {
          return true;
        } else if (
          (menu == '/employee' || menu == '/employee/details/:id') &&
          (this.service.getRole() == 'employee' || this.service.getRole() == "nurse")
        ) {
          return true;
        } else if (
          (menu == '/doctor' || menu == '/doctor/details/:id') &&
          this.service.getRole() == 'doctor'
        ) {
          return true;
        } else {
          // this.router.navigate(['']);
          // this.tostr.warning('You dont have access.');
          return true;
        }
      } else {
        return true;
      }
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
