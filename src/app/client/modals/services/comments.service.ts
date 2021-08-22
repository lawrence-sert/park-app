import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from 'src/app/auth/services/user.service';
import * as firebase from 'firebase';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

import { Comments } from 'src/app/client/modals/models/comments.model';

@Injectable({
	providedIn: 'root'
})
export class CommentsService {

	crrntUsr : any;

	constructor(
		public firestore: AngularFirestore,  
		public router: Router,  
		private toastr: ToastrService,
		private modalCtrl : ModalController,
		) { 

	}

	createComment(data, pageId) {

		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;

		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < 5; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		const comment_id = text;

		// Add a new document in collection "cities"
		return this.firestore
		.collection(`recipes/${pageId}/comments`).doc(comment_id).set({
			comment_id : comment_id,
			comment_main : data.comment,
			date : firebase.default.firestore.FieldValue.serverTimestamp(),
			userId : id
		})
		.then(() => {
			this.toastr.success('Comment Save', 'Welcome Back');
			this.closeModel();
			console.log("Document successfully written!");
		})
		.catch((error) => {
			console.error("Error writing document: ", error);
		});
	}

	async closeModel() {
		const close: string = "Modal Removed";
		await this.modalCtrl.dismiss(close);
	}
}
