import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Posts } from 'src/app/model/posts.model';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
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

  	 getPosts() {
		return this.firestore.collection('posts').snapshotChanges();
	}
}
