import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthService } from "src/app/auth/services/auth.service";
import { UserService } from 'src/app/auth/services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  userData: any; // Save logged in user data
  userInfo: any; // Save logged in user data

  uid: any;
  crrntUsr: any;
  userRef: any;
  userEmail: any;
  firstname: any;
  lastname: any;
  displayName: any;
  email: any;
  emailVerified?: boolean;
  accountType?: any;
  location?: any;
  firstrun : any;
  photoUrl : any;


  constructor(
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public authService: AuthService,
    public usersService: UserService,
    public router: Router
    ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        this.userInfo = JSON.parse(localStorage.getItem('user')|| '{}');

        // Local storage information
        this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
        const id = this.crrntUsr.uid;
        this.usersService.getUserDoc(id).subscribe(res => {
          this.userRef = res;
          this.firstrun = this.userRef.firstrun;
          this.firstname = this.userRef.firstname;
          this.lastname = this.userRef.surname;
          this.displayName = this.userRef.displayName;
          this.emailVerified = this.userRef.emailVerified;
          this.accountType = this.userRef.accountType;
          this.location = this.userRef.location; 
          this.photoUrl = this.userRef.photoUrl; 
        });
      } else {

      }
    })
  }

  ngOnInit() {


  }
}
