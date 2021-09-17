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
		) {}

	getPostsCat() {
		return this.firestore.collection('posts_cat').snapshotChanges();
	}
}
