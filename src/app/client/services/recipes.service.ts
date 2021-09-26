import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Recipes } from 'src/app/client/models/recipes.model';
import { UserService } from 'src/app/auth/services/user.service';
import { ToastrService } from 'ngx-toastr';
import * as firebase from 'firebase';

@Injectable({
	providedIn: 'root'
})
export class RecipesService {

	uid: any;
	userRef: any;
	crrntUsr: any;
	displayName: any;
	photoUrl: any;

	constructor(
		private firestore: AngularFirestore,
		public usersService: UserService,
		private toastr: ToastrService
		) { 
		// Local storage information
		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;
	}

	getRecipes() {
		return this.firestore.collection('recipes').snapshotChanges();
	}

	updateLike(pageId) {
		//add a like to main recipes

		// get user information
		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;
		this.usersService.getUserDoc(id).subscribe(res => {
			this.userRef = res;
			this.displayName = this.userRef.displayName;
			this.photoUrl = this.userRef.photoUrl;

			var text = "";
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			for (var i = 0; i < 5; i++)
				text += possible.charAt(Math.floor(Math.random() * possible.length));
			const like_id = text;

			// Add a new document in collection "cities"
			return this.firestore
			.collection(`recipes/${pageId}/likes`).doc(like_id).set({
				id : like_id,
				displayName : this.displayName,
				photoUrl : this.photoUrl,
				date : firebase.default.firestore.FieldValue.serverTimestamp(),
				userId : id
			})
			.then(() => {
				console.log("Document successfully written!");
			})
			.catch((error) => {
				console.error("Error writing document: ", error);
			});
		});
		
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
						var new_score = doc.data().recipe_like + 1;
						transaction.update(doc.ref, { recipe_like: new_score });
					});
				}).then(function() {
					return this.firestore
					.collection(`users/${id}/recipes`)
					.add({
						recipe_id : pageId,
						date : firebase.default.firestore.FieldValue.serverTimestamp()
					});
				}).catch(function(error) {
					console.log(error);
				});

			});
		})
		.catch(function(error) {
			console.log("Error getting documents: ", error);
		});
	}

	getIngredients(pageId) {
		return this.firestore.collection(`recipes/${pageId}/ingredient`).snapshotChanges();
	}

	getMethod(pageId) {
		return this.firestore.collection(`recipes/${pageId}/method`).snapshotChanges();
	}
}
