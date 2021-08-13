import { Injectable, NgZone } from '@angular/core';
import User from 'src/app/model/user.model';
import  auth  from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any; // Save logged in user data
  userInfo: any; // Save logged in user data
  userState: any;

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,  
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private toastr: ToastrService
  ) {    
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        this.userInfo = JSON.parse(localStorage.getItem('user')|| '{}');

      } else {

      }
    })
  }


  // Sign in with email/password
  SignIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.toastr.success(email, 'Welcome Back');
          this.router.navigate(['/dashboard']);
        });
      }).catch((error) => {
        this.toastr.warning(error.message, 'Something Wrong');
      })
  }

  // Sign up with email/password
  SignUp(email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SetUserData(result.user);
        this.SendVerificationMail();
      }).catch((error) => {
        this.toastr.warning(error.message, 'Sorry');
      })
  }

  SendVerificationMail() {
    return this.afAuth.currentUser.then(u => u?.sendEmailVerification())
    .then(() => {
      this.router.navigate(['/verify-email']);
    })
  } 


  ForgotPassword(passwordResetEmail) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      this.toastr.success(passwordResetEmail, 'check your inbox');
    }).catch((error) => {
      this.toastr.warning(error.message, 'Something Wrong');
    })
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')|| '{}');
    return (user !== null && user.emailVerified !== true) ? true : false;
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified,
      firstrun : '0',
      accountType : '0',
      location : '-'
    }
    return userRef.set(userData, {
      merge: true
    });
    
  }

  // Sign out 
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
  }

}