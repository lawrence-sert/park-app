import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProductCategories } from 'src/app/client/models/product-categories.model';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoriesService {

  constructor(private firestore: AngularFirestore) { }

  //products categories
	getProductCategories() {
		return this.firestore.collection('products_categories').snapshotChanges();
	}


	
}
