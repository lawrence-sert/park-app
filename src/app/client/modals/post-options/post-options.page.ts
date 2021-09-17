import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage'
import { Router } from '@angular/router';
import { ModalController, LoadingController } from '@ionic/angular';
import { UserService } from 'src/app/auth/services/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PostsService } from 'src/app/client/services/posts.service';
import { Posts } from 'src/app/client/models/posts.model';

@Component({
	selector: 'app-post-options',
	templateUrl: './post-options.page.html',
	styleUrls: ['./post-options.page.scss'],
})
export class PostOptionsPage implements OnInit {

	// Data passed in by componentProps
  @Input() pageId: string;

	uid: any;
	crrntUsr : any;
	userRef : any;
	photoUrl: any;

	postRef: AngularFirestoreCollection<Posts>;
	post$: Observable<Posts[]>;
	postID: any[] = [];

	constructor(
		private db: AngularFirestore, 
		private storage: AngularFireStorage,
		private router: Router, 
		private loading :LoadingController, 
		private userService: UserService,
		private modalCtr: ModalController,
		public postService: PostsService
		) { }

	ngOnInit() {
		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;
		this.userService.getUserDoc(id).subscribe(res => {
			this.userRef = res;
			this.photoUrl = this.userRef.photoUrl;
		});

		this.postRef = this.db.collection<{}>('posts', ref => ref.where('id', '==', this.pageId));
		this.post$ = this.postRef.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data(); // DB Questions
				const id = a.payload.doc.id;
				return { id, ...data };
			}))
			);
	}

	closeModal() {
		this.modalCtr.dismiss({
			'dismissed': true
		});
	}

	addLike() {
		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;
		this.postService.updateLike(this.pageId, id);
	}

}
