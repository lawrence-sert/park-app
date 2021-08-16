import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Promotions } from 'src/app/client/models/promotions.model';

@Injectable({
  providedIn: 'root'
})
export class PromotionsService {

  constructor(
		private firestore: AngularFirestore
		) {}

  	getPromotions() {
		return this.firestore.collection('promotions').snapshotChanges();
	}
}


