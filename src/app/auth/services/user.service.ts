import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import User from 'src/app/auth/models/user.model';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';


@Injectable({
	providedIn: 'root'
})
export class UserService {

	private dbPath = '/users';


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
		let photourl : string;
		photourl = 'assets/img/default.png';

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
			location : user.location
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


}
