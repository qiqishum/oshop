import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, Router} from '@angular/router';
import {AppUser} from './models/app-user';
import {UserService} from './user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';


@Injectable()
export class AuthService {
user$: Observable<firebase.User>;
  constructor(private userService: UserService,
    private afAuth: AngularFireAuth,
              private route: ActivatedRoute,
              private router: Router) {
    this.user$ =  this.afAuth.authState;
  }

  loginGoogle() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    //this.router.navigate(['/products']);
  }

  loginGithub() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GithubAuthProvider());

  }

  logout() {
    this.afAuth.auth.signOut();
  }

 get appUser$(): Observable<AppUser> {
   return this.user$
     .switchMap(user => {
       if (user) return  this.userService.get(user.uid); console.log(user);
       // @ts-ignore
       return Observable.of(null);

     });

 }


}
