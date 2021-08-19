import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/auth/services/auth.service";
import { UserService } from 'src/app/auth/services/user.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { ProductsService } from 'src/app/client/services/products.service';
import {Product} from 'src/app/client/models/product.model';

//product categorys
import { ProductCategoriesService } from 'src/app/client/services/product-categories.service';
import {ProductCategories} from 'src/app/client/models/product-categories.model';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-add-basket',
	templateUrl: './add-basket.page.html',
	styleUrls: ['./add-basket.page.scss'],
})
export class AddBasketPage implements OnInit {

	uid: any;
	crrntUsr: any;
	userRef: any;
	userEmail: any;
	firstname: any;
	lastname: any;
	displayName: any;
	email: any;
	emailVerified?: boolean;
	photoURL: any;
	accountType?: any;
	firstrun : any;

	//basket
	products_categories : any;
	products : any;
	title : any;
	producted : any;

	//form information comes here
	public basketForm: FormGroup;

	allSubscriptions: Subscription[] = [];
	categorySubscription: Subscription = new Subscription();

	categoryList: ProductCategories[] = [];
	productList: Product[] = [];
	productListed: Product[] = [];


	constructor(
		private authService: AuthService,
		public usersService: UserService,
		public formBuilder: FormBuilder,
		private productService: ProductsService,
		public afs: AngularFirestore,
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
			this.firstrun = this.userRef.firstrun;
			this.firstname = this.userRef.firstname;
			this.lastname = this.userRef.surname;
			this.displayName = this.userRef.displayName;
			this.emailVerified = this.userRef.emailVerified;
			this.accountType = this.userRef.accountType;
			this.photoURL = this.userRef.photoURL;
		});

		this.basketForm = this.formBuilder.group({
			products_category: [''],
			product: ['']
		});


      this.allSubscriptions.push(this.productsCategory.valueChanges.subscribe((value) => {
        this.selectedCountry();
      }));

	}

	get productsCategory(){
		return this.basketForm.get('products_category')
	}
	get product(){
		return this.basketForm.get('product')
	}


	//get all categories
	getCategories(){
		return this.afs.collection<ProductCategories>('products_categories', ref => ref.orderBy('category_name'))
		.valueChanges({ idField: 'id'})
		.subscribe((products_categories) => {
			this.categoryList = products_categories
		})
	}

	selectedCountry(){
    this.categorySubscription.unsubscribe();
    this.categorySubscription = this.afs.collection<Product>('products', ref => ref.where('Category', '==', this.productsCategory.value))
    .valueChanges({ idField: 'id'}).subscribe((products) => {
      this.producted = products;
    })
  }


	//get all categories
	getProducts(){
		return this.afs.collection<Product>('products', ref => ref.orderBy('Item'))
		.valueChanges({ idField: 'id'})
		.subscribe((products) => {
			this.productList = products
		})
	}

}
