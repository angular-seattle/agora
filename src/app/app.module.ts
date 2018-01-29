import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { FormsModule } from '@angular/forms';
import { 
  MatTableModule,
  MatToolbarModule,
  MatSnackBarModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule 
} from '@angular/material';

import {
  AuthMethods,
  AuthProvider,
  AuthProviderWithCustomConfig,
  CredentialHelper,
  FirebaseUIAuthConfig,
  FirebaseUIModule
} from 'firebaseui-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { environment } from '../environments/environment';
import { AppRoutes } from './app.routes';

@NgModule({
  exports: [
    MatButtonModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule
  ]
})
export class MaterialImportModule{ }

const firebaseUiAuthConfig: FirebaseUIAuthConfig = {
  providers: [
    AuthProvider.Google,
    AuthProvider.Twitter,
    AuthProvider.Github,
  ],
  method: AuthMethods.Popup,
  tos: '<your-tos-link>',
  credentialHelper: CredentialHelper.AccountChooser
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    AppRoutes,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    MaterialImportModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
