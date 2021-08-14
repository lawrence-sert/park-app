import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import User from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';
import { MenuController } from '@ionic/angular';



@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.page.html',
	styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

	type: string;

	uid: any;
	crrntUsr: any;
	userRef: any;
	userEmail: any;
	firstname: any;
	lastname: any;
	displayName: any;
	email: any;
	emailVerified?: boolean;
	location: any;
	accountType?: any;
	firstrun : any;

	constructor(
		public authService: AuthService,
		private usersService: UserService,
		public router: Router,
		public menuCtrl: MenuController,
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
			this.location = this.userRef.location;

			console.log(this.firstrun);
          if(this.firstrun==='0') {
            this.router.navigate(['/info']);
          }
		});
	}

	async ngOnInit() {
		//await LocalNotifications.requestPermission();
		this.type = 'home';
		
	}

	ionViewWillEnter() {

		if(this.accountType==='0') {
			this.menuCtrl.enable(false);
		}
		else {
			this.menuCtrl.enable(true);
		}
		
	}

	segmentChanged(ev: any) {
		console.log('Segment changed', ev);
	}

	doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }





}
