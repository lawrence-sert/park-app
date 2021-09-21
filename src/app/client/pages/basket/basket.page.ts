import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/auth/services/user.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AlertController, ModalController } from '@ionic/angular';
import { AddBasketPage } from 'src/app/client/modals/add-basket/add-basket.page';

import { ImageUpPage } from 'src/app/auth/image-up/image-up.page';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import 'rxjs/add/operator/map';

import { BasketService } from 'src/app/client/services/basket.service';
import { Basket } from 'src/app/client/models/basket.model';

//get basket items
import { BasketItemsService } from 'src/app/client/services/basket-items.service';
import { BasketItems } from 'src/app/client/models/basket-items.model';

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
	photoUrl: any;

	basketRef: AngularFirestoreCollection<Basket>;
	basket$: Observable<Basket[]>;
	basketID: any[] = [];
	public parameterValue: any[] = [];

	type: string;

	products : any;
	product : any;
	product_detail : any;

	recipes : any;

	bassketItems: Basket[] = [];
	items : any;
	basketItems : any;

	modelData: any;

	allSubscriptions: Subscription[] = [];

	pdctId: any;
	pdctIded: any;

	users : any;
	Pdct_id : any;
	challenges : any;
	

	constructor(
		public usersService: UserService,
		public basketService: BasketService,
		public basketItemsService: BasketItemsService,
		private recipesService: RecipesService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		public db: AngularFirestore,
		private modalCtrl: ModalController
		) {}


	ngOnInit() {

		this.activatedRoute.params.subscribe(parameter => {
			this.parameterValue = parameter.basketID;
		});
		const param = this.parameterValue;

		this.type = 'basket-items';

		// Local storage information
		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;


		this.users = this.db.collection(`users/${id}/basket/$param/basket_items`).snapshotChanges();
		this.users.subscribe((results) => {
			//console.log(results)
			results.forEach(el => {
				console.log('Keys:',el.key,el.payload.val().product_id)
				this.Pdct_id = el.payload.val().product_id;
				console.log(this.Pdct_id);
				console.log('here');
			});
		}
		);




		this.uid = this.crrntUsr.uid;
		this.usersService.getUserDoc(id).subscribe(res => {
			this.userRef = res;
			this.photoUrl = this.userRef.photoUrl;
		});
		

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

	async openCalModalBasket() {
		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;
		const pageId = this.parameterValue;
		const modal = await this.modalCtrl.create({
			component: AddBasketPage,
			cssClass: 'app-comment',
			backdropDismiss: false,
			componentProps: {
				'pageId': pageId
			}
		});

		modal.onDidDismiss().then((modelData) => {
			if (modelData !== null) {
				this.modelData = modelData.data;
				console.log('Modal Data : ' + modelData.data);
			}
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
		const closeModal: string = "Modal Closed";
		await this.modalCtrl.dismiss(closeModal);
	}


	deleteBasket(basketItemid) {
		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;
		this.basketService.deleteBasket(id, basketItemid );
	}

	deleteBasketItem(basketItemid) {
		const param = this.parameterValue;
		this.basketItemsService.deleteBasketItem(param,basketItemid);
	}

	editBasketItem(basketItemid) {
		
	}





}
