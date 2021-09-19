import { Component, OnInit, Input } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthService } from "src/app/auth/services/auth.service";
import { UserService } from 'src/app/auth/services/user.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-add-points',
	templateUrl: './add-points.page.html',
	styleUrls: ['./add-points.page.scss'],
})
export class AddPointsPage implements OnInit {

	// Data passed in by componentProps
	@Input() pageId: string;

	uid: any;
	crrntUsr: any;
	userRef: any;
	photoURL: any;
	point: any;

	//form information comes here
	public pointsForm: FormGroup;

	constructor(
		public authService: AuthService,
		public usersService: UserService,
		public formBuilder: FormBuilder,
		public afs: AngularFirestore,
		private modalCtrl : ModalController,
		private alertCtrl: AlertController
		) { }

	ngOnInit() {
		// Local storage information
		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;
		this.usersService.getUserDoc(id).subscribe(res => {
			this.userRef = res;
			this.point = this.userRef.points;
		});

		this.pointsForm = this.formBuilder.group({
			points: ['']
		});
	}

	get points(){
		return this.pointsForm.get('points')
	}

	async pointInfo() {
		const alert = await this.alertCtrl.create({
			cssClass: 'my-custom-class',
			header: 'Points Rates',
			subHeader: 'Subtitle',
			message: '1 Point = 1 000 RWF',
			buttons: ['OK']
		});

		await alert.present();

		const { role } = await alert.onDidDismiss();
		console.log('onDidDismiss resolved with role', role);
	}


	onSubmit() {
		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;
		this.usersService.addPoints(this.pointsForm.value);
	};

	
	closeModal() {
		this.modalCtrl.dismiss({
			'dismissed': true
		});
	}

}
