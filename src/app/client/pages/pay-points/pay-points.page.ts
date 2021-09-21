import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { UserService } from 'src/app/auth/services/user.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ImageUpPage } from 'src/app/auth/image-up/image-up.page';

import { AccountsService } from 'src/app/client/services/accounts.service';
import { Accounts } from 'src/app/client/models/accounts.model';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-pay-points',
	templateUrl: './pay-points.page.html',
	styleUrls: ['./pay-points.page.scss'],
})
export class PayPointsPage implements OnInit {

	public payForm: FormGroup;

	uid: any;
	crrntUsr: any;
	userRef: any;
	photoUrl : any;

	payRef!: AngularFirestoreCollection<Accounts>;
	pay$!: Observable<Accounts[]>;
	accountID: any[] = [];
	public parameterValue: any[] = [];

	constructor(
		public usersService: UserService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		public db: AngularFirestore,
		private modalCtrl : ModalController,
		public accountsService: AccountsService,
		public formBuilder: FormBuilder,
		private alertCtrl: AlertController,
		) { 
		this.payForm = this.formBuilder.group({
			message: ['']
		});
	}

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
			this.parameterValue = parameter.accountID
		});

		this.payRef = this.db.collection<{}>(`users/${id}/account`, ref => ref.where('id', '==', this.parameterValue));
		this.pay$ = this.payRef.snapshotChanges().pipe(
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

	async presentAlertRadio() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Radio',
      inputs: [
        {
          name: 'mobile',
          type: 'radio',
          label: 'Mobile Transfer',
          value: 'mobile',
          handler: () => {
            console.log('Radio 1 selected');
          },
          checked: true
        },
        {
          name: 'bank',
          type: 'radio',
          label: 'Bank Transfer',
          value: 'bank',
          handler: () => {
            console.log('Radio 2 selected');
          }
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }


	onSubmit() {
		console.log(this.payForm.value);
		this.accountsService.makePayment(this.payForm.value);
	}

}
