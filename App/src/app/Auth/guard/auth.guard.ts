import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service: AuthService, private router: Router,private tostr:ToastrService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.service.isLoggedIn()) {
      if (route.url.length > 0) {
        let menu = route.url[0].path;
        if ((menu == 'employee'||menu == 'patient' ||menu == 'admin') && (this.service.getRole() == 'admin')) {
          return true;
        } else if ( menu=="patient" && this.service.getRole() == 'patient') {
            return true;
          } else if(menu=="employee" && this.service.getRole() == 'employee'){
            return true;
          } else {
            this.router.navigate(['']);
              this.tostr.warning('You dont have access.')
            return false;
          }
        } else{
          return true;
        }
      } else {
      this.router.navigate(['login']);
      return false;
    }
  }

}