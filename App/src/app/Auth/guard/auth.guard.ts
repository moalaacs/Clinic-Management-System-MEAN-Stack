import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr'

import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service: AuthService, private router: Router, private tostr: ToastrService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.service.isLoggedIn()) {
      if (route.url.length > 0) {
        //console.log(route.url);
        //let menu = route.url[0].path;
        //let menu =document.location.href;
        let menu = document.location.pathname;
        console.log(menu)
        if ((menu == '/doctor/add' || menu == '/doctor/edit/:id' || menu== 'emplyee/add'|| menu == 'employee/edit/:id') && (this.service.getRole() == 'patient')) {
          return false;
        } else if (menu == "add" && this.service.getRole() == 'patient') {
          return false;
        } else if (menu == "employee" && this.service.getRole() == 'employee') {
          return true;
        } else {
          this.router.navigate(['']);
          this.tostr.warning('You dont have access.')
          return false;
        }
      } else {
        return true;
      }
    } else {
      this.tostr.warning('You dont have access.');
      this.router.navigate(['login']);
      return false;
    }
  }

}