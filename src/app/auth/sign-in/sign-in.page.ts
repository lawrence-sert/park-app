import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MenuController } from '@ionic/angular';
import { IonLoaderService } from 'src/app/client/services/ion-loader.service';


@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.page.html',
	styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

	constructor(
		public authService: AuthService,
		public menuCtrl: MenuController,
		private ionLoaderService: IonLoaderService
		) {}

	ngOnInit() {
	}

	ionViewWillEnter() {
		this.menuCtrl.enable(false);
	}

  customizeLoader() {
    this.ionLoaderService.customLoader();
  }

}
