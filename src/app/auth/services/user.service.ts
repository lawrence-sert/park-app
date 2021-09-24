import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
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
		public router: Router,
		private modalCtrl : ModalController, 
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
		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;

		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < 5; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		const acc_id = text;

		// Add a new document in collection "cities"
		return this.db
		.collection(`users/${id}/account`).doc(acc_id).set({
			id : acc_id,
			action : "add",
			complete : false,
			points : data.points,
			date : firebase.default.firestore.FieldValue.serverTimestamp()
		})
		.then(() => {
			console.log("Document successfully written!");
			this.closeModel();
			this.router.navigate(['/pay-points', acc_id]);

		})
		.catch((error) => {
			console.error("Error writing document: ", error);
		});
	}

	openMessage() {
		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;

		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < 5; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		const message_id = text;

		// Add a new document in collection "cities"
		return this.db
		.collection(`messages`).doc(id).set({
			id : id,
			message_open : true,
			date : firebase.default.firestore.FieldValue.serverTimestamp()
		})
		.then(() => {
			console.log("Messages Created!");

		})
		.catch((error) => {
			console.error("Error writing document: ", error);
		});
	}

	addMessages() {
		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;

		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < 5; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		const message_id = text;

		// Add a new document in collection "cities"
		return this.db
		.collection(`messages/${id}/main`).doc(message_id).set({
			message_id : message_id,
			message_main : "Welcome, this is you very own direct message board",
			date : firebase.default.firestore.FieldValue.serverTimestamp(),
			user_account : 1,
		})
		.then(() => {
			console.log("First message Created!");

		})
		.catch((error) => {
			console.error("Error writing document: ", error);
		});
	}

	updateMessage() {
		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;
		return this.db
		.collection("users")
		.doc(id)
		.update({
			messagecreated: true
		});
	}



	getAccountActivity(uid) {
		return this.db.collection(`users/${uid}/account`, ref => ref.orderBy('date', 'desc')).snapshotChanges();
	}

	async closeModel() {
		const close: string = "Modal Removed";
		await this.modalCtrl.dismiss(close);
	}


}
