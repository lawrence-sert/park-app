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

	uid: any;
	crrntUsr: any;
	userRef: any;
	userEmail: any;
	firstname: any;
	lastname: any;
	displayName: any;
	email: any;
	emailVerified?: boolean;
	photoURL: any;
	accountType?: number;
	firstrun : any;

	photourl : any = 'assets/img/director2.png';

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
		this.usersService.getUserDoc(id).subscribe(res => {
			this.userRef = res;
			this.userEmail = this.userRef.email;
			this.firstrun = this.userRef.firstrun;
			this.firstname = this.userRef.firstname;
			this.lastname = this.userRef.surname;
			this.displayName = this.userRef.displayName;
			this.emailVerified = this.userRef.emailVerified;
			this.photoURL = this.userRef.photoURL;
			this.accountType = this.userRef.accountType;

			console.log(this.accountType);
		});
	}

}
