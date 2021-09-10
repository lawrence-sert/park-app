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
  	) { 
  	// Local storage information
		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;
  }

  //get user messages
	getUserMessages(id) {
		return this.firestore.collection(`users/${id}/messages`).snapshotChanges();
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
		.collection(`users/${id}/messages`).doc(message_id).set({
			message_id : message_id,
			message_main : data.message,
			date : firebase.default.firestore.FieldValue.serverTimestamp()
		})
		.then(() => {
			this.toastr.success('Message Save');
			console.log("Document successfully written!");
		})
		.catch((error) => {
			console.error("Error writing document: ", error);
		});
	}
}
