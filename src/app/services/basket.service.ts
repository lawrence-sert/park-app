import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Basket } from 'src/app/model/basket.model';
import { UserService } from 'src/app/services/user.service';


@Injectable({
	providedIn: 'root'
})
export class BasketService {

	uid: any;
	crrntUsr: any;


	constructor(
		private firestore: AngularFirestore,
		public usersService: UserService,
		
		) { 
		// Local storage information
		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;
	}

	getBasket(uid) {
		return this.firestore.collection(`users/${uid}/basket`).snapshotChanges();
	}

	createBasket(uid, data) {
		
		return this.firestore
		.collection(`users/${uid}/basket`)
		.add({
			basket_name : data.basket_name,
			basket_date : 'date',
			basket_cost : 'dummy',
			basket_items : 'dummy',
			basket_image : 'assets/img/basket.png',
			basket_completed : false,
			basket_save : false
		});
	}

}
