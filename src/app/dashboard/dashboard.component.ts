import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { FirestoreError } from '@firebase/firestore-types';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  word: Observable<{}>;
  user = '';
  constructor(private firebaseAuth: AngularFireAuth, private store: AngularFirestore) { }

  ngOnInit() {
    this.user = this.firebaseAuth.auth.currentUser.email;
    this.word = this.store.collection('meetups').valueChanges().map(v => JSON.stringify(v));
  }

}
