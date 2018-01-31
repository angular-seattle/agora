import { Component } from '@angular/core';
import { AngularFireAuth} from 'angularfire2/auth';
import {Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {}

  logout() {
    this.firebaseAuth.auth.signOut().then(() => {
      this.router.navigate(['login']);
    });
  }
}
