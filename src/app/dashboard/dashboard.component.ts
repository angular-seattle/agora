import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { FirestoreError } from '@firebase/firestore-types';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { concatAll, map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild(NgForm)
  private form: NgForm;
  updating = false;
  status = '';

  word: Observable<{}>;
  user = '';
  constructor(private http: HttpClient, private firebaseAuth: AngularFireAuth, private store: AngularFirestore) { }

  ngOnInit() {
    this.user = this.firebaseAuth.auth.currentUser.displayName;
    this.word = this.store.collection('meetups').valueChanges().map(v => JSON.stringify(v));
  }

  update() {
    const data = this.form.value;
    const currentUser = this.firebaseAuth.auth.currentUser;
    this.updating = true;
    this.store.collection('users').doc(currentUser.uid)
      .set({
        user_id: currentUser.uid,
        email: currentUser.email,
        invite_slack: data['invite'],
        secret_word: data['secretWord']
      });

    this.http.post('https://us-central1-ngseattle-ff68b.cloudfunctions.net/secretWord/guess', {secret: data['secretWord']})
      .subscribe((res) => {
        console.log(res);
        if (res['success']) {
          this.status = "Done!";
        } else {
          this.status = "Wrong secret word, try again!"
        }
        this.updating = false;
      });
  }

}
