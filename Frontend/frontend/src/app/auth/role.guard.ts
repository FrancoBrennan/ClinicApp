import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const expectedRole = route.data['expectedRole'];

    return this.authService.isLoggedIn().pipe(
      map(isLoggedIn => {
        if (isLoggedIn) {
          const role = this.authService.getRole();
          if (role === expectedRole) {
            return true;
          } else {
            // Redirigir al usuario a la página de error si no tiene el rol adecuado
            return this.router.createUrlTree(['/home']);
          }
        } else {
          // Redirigir al usuario a la página de inicio de sesión si no está autenticado
          return this.router.createUrlTree(['/login']);
        }
      })
    );
  }
}
