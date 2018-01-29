import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
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
    this.firebaseAuth.authState.subscribe((user) => {
      if (user) {
        this.status = user.email;
        console.log
      }
    });
  }

  logout() {
    console.log('got logout');
    this.firebaseAuth.auth.signOut()
        .then((res) => this.router.navigate(['/']));
  }

}
