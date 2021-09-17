import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/auth/services/user.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { ProductsService } from 'src/app/client/services/products.service';
import {Product} from 'src/app/client/models/product.model';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-product',
	templateUrl: './product.page.html',
	styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

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

	type : any;

	productRef: AngularFirestoreCollection<Product>;
	product$: Observable<Product[]>;
	productID: any[] = [];
	public parameterValue: any[] = [];

	constructor(
		public usersService: UserService,
		public productService: ProductsService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		public db: AngularFirestore
		) {}

	ngOnInit() {

		this.type = 'description';

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
			this.parameterValue = parameter.productID
		});

		this.productRef = this.db.collection<{}>('products', ref => ref.where('id', '==', this.parameterValue));
		this.product$ = this.productRef.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data(); // DB Questions
				const id = a.payload.doc.id;
				return { id, ...data };
			}))
			);
	}

	segmentChanged(ev: any) {
		console.log('Segment changed', ev);
	}

}
