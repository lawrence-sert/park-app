import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/auth/services/user.service';
import { AlertController, IonSlides, ModalController, AnimationController } from '@ionic/angular';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { ProductsService } from 'src/app/client/services/products.service';
import {Product} from 'src/app/client/models/product.model';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ImageUpPage } from 'src/app/auth/image-up/image-up.page';

@Component({
	selector: 'app-product',
	templateUrl: './product.page.html',
	styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

	uid: any;
	crrntUsr: any;
	userRef: any;
	photoUrl : any;

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
		public db: AngularFirestore,
		private modalCtrl : ModalController
		) {}

	ngOnInit() {

		this.type = 'description';

		// Local storage information
		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;
		this.uid = this.crrntUsr.uid;
		this.usersService.getUserDoc(id).subscribe(res => {
			this.userRef = res;
			this.photoUrl = this.userRef.photoUrl;
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
