import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { take, map, tap } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/src/router_state';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private firebaseAuth: AngularFireAuth) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.firebaseAuth.authState
    .pipe(
      take(1),
      map(authState => !!authState),
      tap(authenticated => {
        if (!authenticated) {
            this.router.navigate(['login']);
        }})
    );
  }

}
