import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from "src/app/auth/services/auth.service";
import { Router } from "@angular/router";
import User from 'src/app/auth/models/user.model';
import { UserService } from 'src/app/auth/services/user.service';
import { MenuController } from '@ionic/angular';

import { ImageUpPage } from 'src/app/auth/image-up/image-up.page';

import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';



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
	firstrun : any;
	userEmail: any;
	firstname: any;
	lastname: any;
	displayName: any;
	email: any;
	emailVerified?: boolean;
	location: any;
	accountType?: any;
	photoUrl : any;

	constructor(
		public authService: AuthService,
		private usersService: UserService,
		public router: Router,
		public menuCtrl: MenuController,
		private modalCtrl : ModalController
		) { 
		
	}

	async ngOnInit() {
		this.type = 'home';
		// Local storage information
		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;
		this.usersService.getUserDoc(id).subscribe(res => {
			this.userRef = res;
			this.firstrun = this.userRef.firstrun;
			this.photoUrl = this.userRef.photoUrl;
			console.log(this.firstrun);
			if(this.firstrun==='0') {
				this.router.navigate(['/info']);
			}
		});


		console.log('Initializing HomePage');

    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token: Token) => {
        alert('Push registration success, token: ' + token.value);
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        alert('Push received: ' + JSON.stringify(notification));
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      }
    );
		
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

	async openCalModal() {
		const modal = await this.modalCtrl.create({
			component: ImageUpPage,
			cssClass: 'app-image-up',
			backdropDismiss: false
		});
		
		await modal.present();
		
	}





}
