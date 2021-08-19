import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/auth/services/user.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AlertController, ModalController } from '@ionic/angular';
import { AddBasketPage } from 'src/app/client/modals/add-basket/add-basket.page';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { BasketService } from 'src/app/client/services/basket.service';
import {Basket} from 'src/app/client/models/basket.model';

//get basket items
import { BasketItemsService } from 'src/app/client/services/basket-items.service';
import {BasketItems} from 'src/app/client/models/basket-items.model';

import { RecipesService } from 'src/app/client/services/recipes.service';
import { Recipes } from 'src/app/client/models/recipes.model';

import { ProductsService } from 'src/app/client/services/products.service';
import { Product } from 'src/app/client/models/product.model';

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

	type: string;

	products : any;
	product : any;

	recipes : any;

	bassketItems: Basket[] = [];
	items : any;
	basketItems : any;

	allSubscriptions: Subscription[] = [];

	constructor(
		public usersService: UserService,
		public basketService: BasketService,
		public basketItemsService: BasketItemsService,
		private recipesService: RecipesService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		public db: AngularFirestore,
		private modalCtrl: ModalController
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

		this.type = 'basket-items';

		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;
		const param = this.parameterValue;

		console.log(id);

		this.basketRef = this.db.collection<{}>(`users/${id}/basket`, ref => ref.where('basket_id', '==', this.parameterValue));
		this.basket$ = this.basketRef.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data(); // DB Questions
				const id = a.payload.doc.id;
				return { id, ...data };
			}))
			);

		//get all basket items for this param
		this.basketItemsService.getBasketItem(id, param).subscribe((data) => {
			this.basketItems = data.map((e) => {
				return {
					id: e.payload.doc.id,
					...(e.payload.doc.data() as {}),
				} as Basket;
			});
		});

		//read all recipes 
		this.recipesService.getRecipes().subscribe((data) => {
			this.recipes = data.map((e) => {
				return {
					id: e.payload.doc.id,
					...(e.payload.doc.data() as {}),
				} as Recipes;
			});
		});

	}

	segmentChanged(ev: any) {
		console.log('Segment changed', ev);
	}



	async openCalModal() {
		const modal = await this.modalCtrl.create({
			component: AddBasketPage,
			cssClass: 'app-add-basket',
			backdropDismiss: false
		});

		await modal.present();

	}



}
