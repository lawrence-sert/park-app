import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import User from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.page.html',
	styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

	photourl : any = 'assets/img/director2.png';
	
	uid: any;
	firstname: any;
	surname: any;
	displayName: any;
	phone: any;
	email: any;
	gender: any;
	age: any;
	nationality: any;
	photoURL: any;
	diabetesType: any;
	residence: any;
	points : any;
	emailVerified : any;

	firstrun : any;

	crrntUsr : any;
	userEmail : any;
	userRef : any;

	constructor(
		public authService: AuthService,
		private usersService: UserService,
		public router: Router
		) { }

	ngOnInit() {

		// Local storage information
    this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
    const id = this.crrntUsr.uid;
    this.userEmail = this.crrntUsr.email;

    console.log(this.crrntUsr);
    this.usersService.getUserDoc(id).subscribe(res => {
      this.userRef = res;
      this.userEmail = this.userRef.email;
      this.firstrun = this.userRef.firstrun;
      this.firstname = this.userRef.firstname;
      this.surname = this.userRef.surname;
      this.displayName = this.userRef.displayName;
      this.gender = this.userRef.gender;
      this.nationality = this.userRef.nationality;
      this.emailVerified = this.userRef.emailVerified;
      this.photoURL = this.userRef.photoURL;
      this.points = this.userRef.points;

      console.log(this.firstrun);
      if(this.firstrun=='0') {
        this.router.navigate(['info']);
      }
      // if(this.firstrun=='1') {
      //   this.editImageModal()
      // }
    });
	}

}
