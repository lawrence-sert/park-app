import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { Basket } from 'src/app/client/models/basket.model';
import { UserService } from 'src/app/auth/services/user.service';
import * as firebase from 'firebase';
import { ToastrService } from 'ngx-toastr';


import { map } from 'rxjs/operators';



@Injectable({
	providedIn: 'root'
})
export class BasketService {

	uid: any;
	crrntUsr: any;


	constructor(
		private firestore: AngularFirestore,
		public usersService: UserService,
		private toastr: ToastrService,
		public db: AngularFireDatabase,
		
		) { 
		// Local storage information
		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;
	}

	getBasket(uid) {
		return this.firestore.collection(`users/${uid}/basket`).snapshotChanges();
	}

	

	createBasket(uid, data) {

		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < 5; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		const basket_id = text;

		// Add a new document in collection "cities"
		return this.firestore
		.collection(`users/${uid}/basket`).doc(basket_id).set({
			basket_id : basket_id,
			basket_name : data.basket_name,
			basket_date : firebase.default.firestore.FieldValue.serverTimestamp(),
			basket_cost : 0,
			basket_completed : false,
			basket_save : false
		})
		.then(() => {
			console.log("Document successfully written!");
		})
		.catch((error) => {
			console.error("Error writing document: ", error);
		});
	}


	deleteBasket(uid, Basketid:string): Promise<void> {
		return this.firestore.collection(`users/${uid}/basket/`).doc(Basketid).delete()
		.then(() => {
			this.toastr.success('Basket Removed', '');
		}).catch((error) => {
			this.toastr.warning(error.message, 'Something Wrong');
		})
	}


	getAll(){
		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;
		const ndini = 'xI9T5'
		return this.db.list(`users/${id}/basket/xI9T5/basket_items`).snapshotChanges().pipe(map(actions => {
			return actions.map(a => {
				const key = a.payload.key;
				console.log(key);
				const data = a.payload.val();
				return {data, key};
			})
		}));
	}


}
