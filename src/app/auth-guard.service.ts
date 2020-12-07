import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router) {
  }

  canActivate(router, state: RouterStateSnapshot) {
     return this.auth.user$.map(user => {
       if (user) return true;
      this.router.navigate(['/login']);
      return false;

    });
  }
}
