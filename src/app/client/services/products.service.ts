import { Injectable } from '@angular/core';
import { AngularFirestore, } from '@angular/fire/firestore';
import { Product } from 'src/app/client/models/product.model';
import { AngularFireDatabase } from '@angular/fire/database';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
		private firestore: AngularFirestore,
		private ngData: AngularFireDatabase
		) {}



  getAll(){
    return this.ngData.list('/products').snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const key = a.payload.key;
        const data = a.payload.val();
        return {data, key};
      })
    }));
  }

	getProducts() {
		return this.firestore.collection('products').snapshotChanges();
	}

	createProduct(product: Product) {
		return this.firestore.collection('products').add(product);
		return this.firestore
		.collection("product")
		.add({
			id: product.id,
			Item: product.item,
			Category: product.category,
			Caption: product.caption,
			Description: product.description,
			Price: product.price
		});
	}

	updateProducts(product: Product) {
		delete product.id;
		this.firestore
		.doc('product/' + product.id)
		.update(product);
	}
	deleteProducts(beefId: string) {
		this.firestore.doc('product/' + beefId).delete();
	}

	//products categories
	getProductCategories() {
		return this.firestore.collection('products_categories').snapshotChanges();
	}
}
