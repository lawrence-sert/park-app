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

	photoUrl : any;
	displayName : any;
	userRef : any;

	constructor(
		public firestore: AngularFirestore,  
		public router: Router,  
		private toastr: ToastrService,
		private modalCtrl : ModalController,
		public usersService: UserService,
		) { 

	}

	createComment(data, pageId) {

		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;
		this.usersService.getUserDoc(id).subscribe(res => {
			this.userRef = res;
			this.photoUrl = this.userRef.photoUrl;
			this.displayName = this.userRef.displayName;
		});

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
			photoUrl : this.photoUrl,
			displayName : this.displayName,
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

	updateComment(data, pageId) {
		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;
		//add a like to main recipes
		var that = this;
		this.firestore.firestore.collection("recipes").where("id", "==", pageId)
		.get()
		.then(function(querySnapshot) {

			querySnapshot.forEach(function(doc) {
				// doc.data() is never undefined for query doc snapshots
				console.log(doc.id, " => ", doc.data());

				return that.firestore.firestore.runTransaction(function(transaction) {
					// This code may get re-run multiple times if there are conflicts.
					return transaction.get(doc.ref).then(function(doc) {
						if (!doc.exists) {
							throw "Document does not exist!";
						}

						//THIS IS WHERE TO DO THE INCREMENT
						var new_score = doc.data().recipe_comment + 1;
						transaction.update(doc.ref, { recipe_comment: new_score });
					});
				}).then(function() {
					this.toastr.success('Nice!', 'You Like This Recipe');
					return this.firestore
					.collection(`users/${id}/comments/recipes/${pageId}`)
					.add({
						comment_id : pageId,
						comment_main : data.comment,
						date : firebase.default.firestore.FieldValue.serverTimestamp()
					});

				}).catch(function(error) {
					this.toastr.warning('Oops!', 'Something Wrong');
				});

			});
		})
		.catch(function(error) {
			console.log("Error getting documents: ", error);
		});
	}
}
