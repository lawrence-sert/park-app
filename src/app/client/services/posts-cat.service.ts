import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Posts } from 'src/app/client/models/posts.model';
import { UserService } from 'src/app/auth/services/user.service';

@Injectable({
	providedIn: 'root'
})
export class PostsCatService {

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

	getPostsCat() {
		return this.firestore.collection('posts_cat').snapshotChanges();
	}
}
