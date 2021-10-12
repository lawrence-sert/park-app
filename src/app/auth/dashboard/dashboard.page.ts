import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/auth/services/user.service';
import { MenuController } from '@ionic/angular';
import { ImageUpPage } from 'src/app/auth/image-up/image-up.page';
import { SearchPage } from 'src/app/client/modals/search/search.page';

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
	firstrun: any;
	accountType: any;
	photoUrl: any;

	constructor(
		public authService: AuthService,
		private usersService: UserService,
		public router: Router,
		public menuCtrl: MenuController,
		private modalCtrl: ModalController
		) {	}

	ngOnInit() {
		this.type = 'home';
		// Local storage information
		this.crrntUsr = JSON.parse(window.localStorage.getItem('user'));
		const id = this.crrntUsr.uid;
		this.usersService.getUserDoc(id).subscribe(res => {
			this.userRef = res;
			this.firstrun = this.userRef.firstrun;
			this.photoUrl = this.userRef.photoUrl;
			if(this.firstrun==='0') {
				this.router.navigate(['/info']);
			}
		});
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


	async openSearchModal() {
		const modal = await this.modalCtrl.create({
			component: SearchPage,
			cssClass: 'app-search',
			backdropDismiss: false
		});
		await modal.present();
	}
	async openCalModal() {
		const modal = await this.modalCtrl.create({
			component: ImageUpPage,
			cssClass: 'app-image-up',
			backdropDismiss: false
		});
		await modal.present();
	}
	async close() {
		const closeModal: string = 'Modal Closed';
		await this.modalCtrl.dismiss(closeModal);
	}


}
