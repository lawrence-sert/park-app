import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MenuController } from '@ionic/angular';
import { IonLoaderService } from 'src/app/client/services/ion-loader.service';

import { Network } from '@ionic-native/network/ngx';


@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.page.html',
	styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

	constructor(
		public authService: AuthService,
		public menuCtrl: MenuController,
		private network: Network,
		private ionLoaderService: IonLoaderService
		) {}

	ngOnInit() {
		let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
			console.log('network was disconnected :-(');
			console.log('here');
		});

		// stop disconnect watch
		disconnectSubscription.unsubscribe();


		// watch network for a connection
		let connectSubscription = this.network.onConnect().subscribe(() => {
			console.log('network connected!');
			// We just got a connection but we need to wait briefly
			// before we determine the connection type. Might need to wait.
			// prior to doing any api requests as well.
			setTimeout(() => {
				if (this.network.type === 'wifi') {
					console.log('we got a wifi connection, woohoo!');
				}
			}, 3000);
		});
		// stop connect watch
		connectSubscription.unsubscribe();

	}

	ionViewWillEnter() {
		this.menuCtrl.enable(false);
	}

	customizeLoader() {
		this.ionLoaderService.customLoader();
	}



}
