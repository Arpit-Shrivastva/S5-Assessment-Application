import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const expectedRole: string[] = route.data['expectedRole'];
    const userRole = localStorage.getItem('role');

    if (expectedRole.includes(userRole!)) {
      return true;
    } else {
      this.router.navigate(['/login']); 
      return false;
    }
  }
}

