import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/auth/services/user.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ImageUpPage } from 'src/app/auth/image-up/image-up.page';

import { TipsService } from 'src/app/client/services/tips.service';
import { Tips } from 'src/app/client/models/tips.model';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-tip',
	templateUrl: './tip.page.html',
	styleUrls: ['./tip.page.scss'],
})
export class TipPage implements OnInit {

	uid: any;
	crrntUsr: any;
	userRef: any;
	photoUrl : any;

	tipRef: AngularFirestoreCollection<Tips>;
	tip$: Observable<Tips[]>;
	tip_id: any[] = [];

	public parameterValue: any[] = [];

	constructor(
		public usersService: UserService,
		public tipsService: TipsService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		public db: AngularFirestore,
		private modalCtrl : ModalController,
		) {}

	ngOnInit() {

		// Local storage information
		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;
		this.uid = this.crrntUsr.uid;
		this.usersService.getUserDoc(id).subscribe(res => {
			this.userRef = res;
			this.photoUrl = this.userRef.photoUrl;
		});

		this.activatedRoute.params.subscribe(parameter => {
			this.parameterValue = parameter.tipID
		});

		this.tipRef = this.db.collection<{}>('tips', ref => ref.where('id', '==', this.parameterValue));
		this.tip$ = this.tipRef.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data(); // DB Questions
				const id = a.payload.doc.id;
				return { id, ...data };
			}))
			);
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
		const closeModal: string = "Modal Closed";
		await this.modalCtrl.dismiss(closeModal);
	}

}
