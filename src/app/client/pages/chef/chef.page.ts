import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/auth/services/user.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ChefsService } from 'src/app/client/services/chefs.service';
import {Chefs} from 'src/app/client/models/chefs.model';

@Component({
  selector: 'app-chef',
  templateUrl: './chef.page.html',
  styleUrls: ['./chef.page.scss'],
})
export class ChefPage implements OnInit {

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
	phone : any;

	chefRef: AngularFirestoreCollection<Chefs>;
	chef$: Observable<Chefs[]>;
	chef_id: any[] = [];

	public parameterValue: any[] = [];

  constructor(
  	public usersService: UserService,
		public chefService: ChefsService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		public db: AngularFirestore,
		private modalCtrl : ModalController,
  	) { 
  	
  }

  ngOnInit() {
  	// Local storage information
		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;
		this.uid = this.crrntUsr.uid;
		this.usersService.getUserDoc(id).subscribe(res => {
			this.userRef = res;
			this.firstrun = this.userRef.firstrun;
			this.firstname = this.userRef.firstname;
			this.lastname = this.userRef.surname;
			this.displayName = this.userRef.displayName;
			this.emailVerified = this.userRef.emailVerified;
			this.accountType = this.userRef.accountType;
			this.location = this.userRef.location;
			this.phone = this.userRef.phone;
			this.email = this.userRef.email;
		});

		this.activatedRoute.params.subscribe(parameter => {
			this.parameterValue = parameter.chefID
		});

		this.chefRef = this.db.collection<{}>('chefs', ref => ref.where('id', '==', this.parameterValue));
		this.chef$ = this.chefRef.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data(); // DB Questions
				const id = a.payload.doc.id;
				return { id, ...data };
			}))
			);
  }

}
