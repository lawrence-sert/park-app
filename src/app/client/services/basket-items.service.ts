import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BasketItems } from 'src/app/client/models/basket-items.model';
import { UserService } from 'src/app/auth/services/user.service';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class BasketItemsService {

	uid: any;
	crrntUsr: any;

  constructor(
		private firestore: AngularFirestore,
		public usersService: UserService,
		
		) { 

	}

	getBasketItem(uid, bid) {
		return this.firestore.collection(`users/${uid}/basket/${bid}/basket_items`).snapshotChanges();
	}

	createBasketItem(data, pageId) {

		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;

		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < 5; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		const basketItem_id = text;
		const basket  = "RXJDP";
		// Add a new document in collection "cities"
		return this.firestore
		.collection(`users/${id}/basket/${pageId}/basket_items/`).doc(basketItem_id).set({
			id : basketItem_id,
			category : data.products_category,
			date : firebase.default.firestore.FieldValue.serverTimestamp(),
			product_id : data.product,
			quantity : 3
		})
		.then(() => {
			console.log("Document successfully written!");
		})
		.catch((error) => {
			console.error("Error writing document: ", error);
		});
	}
}
