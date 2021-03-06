import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {  MenuController } from '@ionic/angular';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.page.html',
	styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

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
	accountType?: any;
	firstrun : any;
	phone : any;

	constructor(
		public usersService: UserService,
		public menuCtrl: MenuController
	) { 
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
			this.photoURL = this.userRef.photoURL;
			this.phone = this.userRef.phone;
			this.email = this.userRef.email;
		});
	}

	ngOnInit() {
	}

	ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

}
