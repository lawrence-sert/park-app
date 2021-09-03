import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { BasketItems } from 'src/app/client/models/basket-items.model';
import { UserService } from 'src/app/auth/services/user.service';
import * as firebase from 'firebase';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class BasketItemsService {

	uid: any;
	crrntUsr: any;

  constructor(
		private firestore: AngularFirestore,
		public usersService: UserService,
		private toastr: ToastrService,
		private modalCtrl : ModalController,
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
		// Add a new document in collection "cities"
		return this.firestore
		.collection(`users/${id}/basket/${pageId}/basket_items/`).doc(basketItem_id).set({
			id : basketItem_id,
			category : data.products_category,
			date : firebase.default.firestore.FieldValue.serverTimestamp(),
			product_id : data.product,
			quantity : data.quantity
		})
		.then(() => {
			console.log("Document successfully written!");
			this.toastr.success('Item Added To Basket', 'Success');
			this.closeModel();
		})
		.catch((error) => {
			console.error("Error writing document: ", error);
		});
	}

	deleteBasketItem(param, basketItemid) {
		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;
		return this.firestore.collection(`users/${id}/basket/${param}/basket_items`).doc(basketItemid).delete()
		.then(() => {
			this.toastr.success('Basket Removed', '');
		}).catch((error) => {
			this.toastr.warning(error.message, 'Something Wrong');
		})
	}


	async closeModel() {
		const close: string = "Modal Removed";
		await this.modalCtrl.dismiss(close);
	}
}
