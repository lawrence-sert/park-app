import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController, AnimationController } from '@ionic/angular';
import { UserService } from 'src/app/auth/services/user.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { ChefsService } from 'src/app/client/services/chefs.service';
import { Chefs } from 'src/app/client/models/chefs.model';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-chef',
	templateUrl: './chef.page.html',
	styleUrls: ['./chef.page.scss'],
})
export class ChefPage implements OnInit {
	segmentValue = '1';
	uid: any;
	crrntUsr: any;
	userRef: any;
	userEmail: any;
	photoUrl: any;


	public parameterValue: any[] = [];

	chefRef: AngularFirestoreCollection<Chefs>;
	chef$: Observable<Chefs[]>;
	chef_id: any[] = [];

	constructor(
		public usersService: UserService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		public db: AngularFirestore,
		private modalCtrl : ModalController,
		private animationCtrl: AnimationController
		) {	}

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
			this.parameterValue = parameter.chefID
		});

		this.segmentValue = 'about';

		this.chefRef = this.db.collection<{}>('chefs', ref => ref.where('id', '==', this.parameterValue));
		this.chef$ = this.chefRef.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data(); // DB Questions
				const id = a.payload.doc.id;
				return { id, ...data };
			}))
			);
	}

	segmentChanged(event) {
		console.log(event);
		this.segmentValue = event.detail.value;
	}

	openCalModal() {
		
	}


}
