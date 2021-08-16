import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/auth/services/user.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BasketService } from 'src/app/client/services/basket.service';
import {Basket} from 'src/app/client/models/basket.model';

@Component({
	selector: 'app-basket',
	templateUrl: './basket.page.html',
	styleUrls: ['./basket.page.scss'],
})
export class BasketPage implements OnInit {

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

	basketRef: AngularFirestoreCollection<Basket>;
	basket$: Observable<Basket[]>;
	basketID: any[] = [];
	public parameterValue: any[] = [];

	constructor(
		public usersService: UserService,
		public basketService: BasketService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		public db: AngularFirestore
		) { 

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
			this.parameterValue = parameter.basketID
		});

		
	}

	ngOnInit() {
		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;

		console.log(id);

		this.basketRef = this.db.collection<{}>(`users/${id}/basket`, ref => ref.where('basket_id', '==', this.parameterValue));
		this.basket$ = this.basketRef.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data(); // DB Questions
				const id = a.payload.doc.id;
				return { id, ...data };
			}))
			);
	}

}
