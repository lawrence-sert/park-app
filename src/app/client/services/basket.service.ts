import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { Basket } from 'src/app/client/models/basket.model';
import { Router } from "@angular/router";
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
		public router: Router, 
		) {
	}

	getBasket(uid) {
		return this.firestore.collection(`users/${uid}/basket`, ref => ref.orderBy('basket_date', 'desc')).snapshotChanges();
	}



	createBasket(uid, data) {

		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;

		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < 5; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		const basket_id = text;

		// Add a new document in collection "cities"
		return this.firestore
		.collection(`users/${id}/basket`).doc(basket_id).set({
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

			//create a record in recent activity

			this.toastr.success('Basket Removed', '');
			this.router.navigate(['/create-basket']);
		}).catch((error) => {
			this.toastr.warning(error.message, 'Something Wrong');
		})
	}


	getCartGoodsData(param) {

		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;

		const goodsIDs: string[] = [];



		return new Promise((resolve) => {
			this.firestore.firestore.collection(`users/${id}/basket/${param}/basket_items`).get()
			.then(querySnapshot => {
				querySnapshot.forEach(doc => {
					var obj = JSON.parse(JSON.stringify(doc.data()));
					obj.$key = doc.id;
					const pdctID = obj.product_id;
					goodsIDs.push(doc.id);


					const getDocs = goodsIDs.map(() => {
						this.firestore.firestore.collection('products').doc(pdctID).get()
						.then((docData) => {
							const her = docData.data();
					
						});
					});

					
				});

			
			});
		});
	}


	payBasket(data) {

	}








}
