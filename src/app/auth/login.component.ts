import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { filter, take, map } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  status: string;

  constructor(private firebaseAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
    this.firebaseAuth.authState.pipe(
      // Only take events where the user is signed in
      filter((user) => !!user),
      // Take one, so we don't need to unsubscribe
      take(1),
    ).subscribe((user) => {
      if (user) {
        this.router.navigate(['/']);
        this.status = user.email;
      }
    });
  }

  logout() {
    console.log('got logout');
    this.firebaseAuth.auth.signOut()
        .then((res) => this.router.navigate(['/']));
  }

}
