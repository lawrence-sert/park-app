import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonSlides, ModalController, AnimationController } from '@ionic/angular';
import { UserService } from 'src/app/auth/services/user.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';


import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PostsService } from 'src/app/client/services/posts.service';
import { Posts } from 'src/app/client/models/posts.model';

import { PostOptionsPage } from 'src/app/client/modals/post-options/post-options.page';

@Component({
	selector: 'app-post',
	templateUrl: './post.page.html',
	styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {



	uid: any;
	crrntUsr: any;
	userRef: any;
	location: any;
	accountType?: any;
	photoUrl : any;

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
		) { 
		
	}

	ngOnInit() {

		// Local storage information
		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;
		this.uid = this.crrntUsr.uid;
		this.usersService.getUserDoc(id).subscribe(res => {
			this.userRef = res;
			this.accountType = this.userRef.accountType;
			this.location = this.userRef.location;
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

	openCalModal(){
		
	}




}
