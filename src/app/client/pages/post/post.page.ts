import { Component, OnInit } from '@angular/core';
import { AlertController, IonSlides, ModalController, AnimationController } from '@ionic/angular';
import { UserService } from 'src/app/auth/services/user.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';


import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PostsService } from 'src/app/client/services/posts.service';
import { Posts } from 'src/app/client/models/posts.model';

import { PostOptionsPage } from 'src/app/client/modals/post-options/post-options.page';

import { ImageUpPage } from 'src/app/auth/image-up/image-up.page';

import { CommentPage } from 'src/app/client/modals/comment/comment.page';

@Component({
	selector: 'app-post',
	templateUrl: './post.page.html',
	styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

	uid: any;
	crrntUsr: any;
	userRef: any;
	photoUrl : any;

	modelData: any;

	postRef: AngularFirestoreCollection<Posts>;
	post$: Observable<Posts[]>;
	postID: any[] = [];
	public parameterValue: any[] = [];

	constructor(
		public usersService: UserService,
		public postService: PostsService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		public db: AngularFirestore,
		private alertCtrl: AlertController,
		private modalCtrl : ModalController
		) {}

	ngOnInit() {
		// Local storage information
		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;
		this.uid = this.crrntUsr.uid;
		this.usersService.getUserDoc(id).subscribe(res => {
			this.userRef = res;
			this.photoUrl = this.userRef.photoUrl;
		});

		this.activatedRoute.params.subscribe(parameter => {
			this.parameterValue = parameter.postID
		});


		this.postRef = this.db.collection<{}>('posts', ref => ref.where('id', '==', this.parameterValue));
		this.post$ = this.postRef.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data(); // DB Questions
				const id = a.payload.doc.id;
				return { id, ...data };
			}))
			);
	}

	async bookMarkPost() {

		const alert = await this.alertCtrl.create({

			cssClass: 'alertHeader',
			header: 'Bookmark This Article',
			inputs: [
			{
				name: 'basket_name',
				type: 'text',
				placeholder: 'Basket Name ?'
			}
			],
			buttons: [
			{
				text: 'Cancel',
				role: 'cancel',
				cssClass: 'secondary',
				handler: () => {
					console.log('Confirm Cancel');
				}
			}, {
				text: 'Create',
				handler: (data: any) => {
					console.log('Saved Information', data);
					this.postService.createPostBookmark(this.uid , data);
				}
			}
			]
		});

		await alert.present();
	}

	async openOptionsModal() {
		const pageId = this.parameterValue;
		const modal = await this.modalCtrl.create({
			component: PostOptionsPage,
			cssClass: 'app-post-options',
			backdropDismiss: false,
			componentProps: {
				'pageId': pageId
			}
		});
		await modal.present();
	}

	addLike() {
		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;
		const pageId = this.parameterValue;
		this.postService.updateLike(pageId, id);
	}

	async openCalModal() {
		const modal = await this.modalCtrl.create({
			component: ImageUpPage,
			cssClass: 'app-image-up',
			backdropDismiss: false
		});

		await modal.present();

	}

	async close() {
		const closeModal: string = "Modal Closed";
		await this.modalCtrl.dismiss(closeModal);
	}


	shareRecipe() {
		
	}

	async openCommentModal() {
		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;
		const pageId = this.parameterValue;
		const modal = await this.modalCtrl.create({
			component: CommentPage,
			cssClass: 'app-comment',
			backdropDismiss: false,
			componentProps: {
				'pageId': pageId
			}
		});

		modal.onDidDismiss().then((modelData) => {
			if (modelData !== null) {
				this.modelData = modelData.data;
				console.log('Modal Data : ' + modelData.data);
			}
		});

		await modal.present();

	}




}
