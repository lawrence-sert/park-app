import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from "src/app/auth/services/auth.service";
import { UserService } from 'src/app/auth/services/user.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { ProductsService } from 'src/app/client/services/products.service';
import {Product} from 'src/app/client/models/product.model';

//product categorys
import { ProductCategoriesService } from 'src/app/client/services/product-categories.service';
import {ProductCategories} from 'src/app/client/models/product-categories.model';

//basket items
import { BasketItemsService } from 'src/app/client/services/basket-items.service';
import {BasketItems} from 'src/app/client/models/basket-items.model';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-add-basket',
	templateUrl: './add-basket.page.html',
	styleUrls: ['./add-basket.page.scss'],
})
export class AddBasketPage implements OnInit {

	// Data passed in by componentProps
  @Input() pageId: string;

	uid: any;
	crrntUsr: any;
	userRef: any;
	photoURL: any;

	//basket
	products_categories : any;
	products : any;
	title : any;
	producted : any;
	product_selected : any;


	//form information comes here
	public basketForm: FormGroup;

	allSubscriptions: Subscription[] = [];
	categorySubscription: Subscription = new Subscription();
	productSubscription: Subscription = new Subscription();

	categoryList: ProductCategories[] = [];
	productList: Product[] = [];
	productListed: Product[] = [];

	constructor(
		public authService: AuthService,
		public usersService: UserService,
		public formBuilder: FormBuilder,
		private productService: ProductsService,
		private productCategoriesService: ProductCategoriesService,
		private basketItemsService: BasketItemsService,
		public afs: AngularFirestore,
		private modalCtrl : ModalController,
		) { }

	ngOnInit() {

		// Local storage information
		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;

		this.allSubscriptions.push(this.getCategories());
		this.allSubscriptions.push(this.getProducts());

		this.uid = this.crrntUsr.uid;
		this.usersService.getUserDoc(id).subscribe(res => {
			this.userRef = res;
			this.photoURL = this.userRef.photoURL;
		});

		this.basketForm = this.formBuilder.group({
			products_category: [''],
			product: [''],
			quantity: [''],
		});


		this.allSubscriptions.push(this.productsCategory.valueChanges.subscribe((value) => {
			this.selectedCategory();
		}));

		this.allSubscriptions.push(this.product.valueChanges.subscribe((value) => {
			this.selectedProduct();
		}));



	}

	get productsCategory(){
		return this.basketForm.get('products_category')
	}
	get product(){
		return this.basketForm.get('product')
	}

	get quantity(){
		return this.basketForm.get('quantity')
	}


	//get all categories
	getCategories(){
		return this.afs.collection<ProductCategories>('products_categories', ref => ref.orderBy('category_name'))
		.valueChanges({ idField: 'id'})
		.subscribe((products_categories) => {
			this.categoryList = products_categories
		})
	}

	selectedCategory(){
		this.categorySubscription.unsubscribe();
		this.categorySubscription = this.afs.collection<Product>('products', ref => ref.where('category', '==', this.productsCategory.value))
		.valueChanges({ idField: 'id'}).subscribe((products) => {
			this.producted = products;
		})
	}

	selectedProduct(){
		this.productSubscription.unsubscribe();
		this.productSubscription = this.afs.collection<Product>('products', ref => ref.where('id', '==', this.product.value))
		.valueChanges({ idField: 'id'}).subscribe((products) => {
			this.product_selected = products;
		})
	}


	//get all categories
	getProducts(){
		return this.afs.collection<Product>('products', ref => ref.orderBy('item'))
		.valueChanges({ idField: 'id'})
		.subscribe((products) => {
			this.productList = products
		})
	}

	onSubmit() {
		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;
		this.basketItemsService.createBasketItem(this.basketForm.value, this.pageId);
	};

	closeModal() {
		this.modalCtrl.dismiss({
			'dismissed': true
		});
	}




}