import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import User from 'src/app/auth/models/user.model';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import * as firebase from 'firebase';


@Injectable({
	providedIn: 'root'
})
export class UserService {

	private dbPath = '/users';

	uid: any;
	userRef: any;
	crrntUsr: any;
	displayName: any;
	photoUrl: any;


	UsersRef: AngularFirestoreCollection<User>;

	constructor(
		private db: AngularFirestore,
		private toastr: ToastrService,
		 public router: Router 
		) {
		this.UsersRef = db.collection(this.dbPath);
	}

	

	create(users: User): any {
		return this.UsersRef.add({ ...users });
	}

	update(id: string, data: any): Promise<void> {
		return this.UsersRef.doc(id).update(data);
	}

	deleteUser(id: string): Promise<void> {
		return this.UsersRef.doc(id).delete();
	}

	getUserDoc(id) {
		return this.db
		.collection<User>('users')
		.doc(id)
		.valueChanges()
	}


	updateUser(user: User, id) {
		let FirstRun: string;
		FirstRun = '1';
    return this.db
		.collection("users")
		.doc(id)
		.update({
			firstname: user.firstname,
			surname: user.lastname,
			displayName: user.firstname +' '+ user.lastname,
			phone: user.phone,
			accountType: user.accountType,
			firstrun: FirstRun,
			province : user.province,
			district : user.district,
			sector : user.sector,
			cell : user.cell,
			village : user.village
		});
	}

	changePhone(uid, data) {
    return this.db
		.collection("users")
		.doc(uid)
		.update({
			phone: data.phone
		});
	}

	changeEmail(uid, data) {
    return this.db
		.collection("users")
		.doc(uid)
		.update({
			email: data.email
		});
	}

	changeAccountType(uid, data) {
    return this.db
		.collection("users")
		.doc(uid)
		.update({
			accountType: data
		});
	}

	changeLocation(uid, data) {
    return this.db
		.collection("users")
		.doc(uid)
		.update({
			location: data
		});
	}


	addPoints(data) {
		// get user information
		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;		
		var that = this;
		this.db.firestore.collection("users").where("uid", "==", id)
		.get()
		.then(function(querySnapshot) {
			querySnapshot.forEach(function(doc) {
				// doc.data() is never undefined for query doc snapshots
				console.log(doc.id, " => ", doc.data());

				return that.db.firestore.runTransaction(function(transaction) {
					// This code may get re-run multiple times if there are conflicts.
					return transaction.get(doc.ref).then(function(doc) {
						if (!doc.exists) {
							throw "Document does not exist!";
						}
						//THIS IS WHERE TO DO THE INCREMENT
						var new_score = doc.data().points + data.points;
						transaction.update(doc.ref, { points: new_score });
					});
				}).then(function() {
					return that.db.firestore
					.collection(`users/${id}/account`)
					.add({
						action : "add",
						complete : false,
						points : data.points,
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


}
