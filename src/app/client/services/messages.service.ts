import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from 'src/app/auth/services/user.service';
import * as firebase from 'firebase';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

import { Messages } from 'src/app/client/models/messages.model';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

	crrntUsr : any;

  constructor(
  	public firestore: AngularFirestore,  
		public router: Router,  
		private toastr: ToastrService,
		private modalCtrl : ModalController,
  	) {}

  //get user messages
	getUserMessages() {
		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;
		console.log(id);
		return this.firestore.collection(`messages/${id}/main`, ref => ref.orderBy('date', 'asc')).snapshotChanges();
	}

  createMessage(data) {

		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;

		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < 5; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		const message_id = text;

		// Add a new document in collection "cities"
		return this.firestore
		.collection(`messages/${id}/main`).doc(message_id).set({
			message_id : message_id,
			message_main : data.message,
			date : firebase.default.firestore.FieldValue.serverTimestamp(),
			user_account : 2,
		})
		.then(() => {
			console.log("User Sent message!");
		})
		.catch((error) => {
			console.error("Error writing document: ", error);
		});
	}
}
