import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/auth/services/auth.service";
import {  MenuController } from '@ionic/angular';


@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.page.html',
	styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

	constructor(
		private authService: AuthService,
		public menuCtrl: MenuController,
		) {

	}

	ngOnInit() {
	}

	ionViewWillEnter() {
		this.menuCtrl.enable(false);
	}

}
