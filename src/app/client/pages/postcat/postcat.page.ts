import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/auth/services/user.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PostsCatService } from 'src/app/client/services/posts-cat.service';
import {PostsCat} from 'src/app/client/models/posts-cat.model';

import { PostsService } from 'src/app/client/services/posts.service';
import { Posts } from 'src/app/client/models/posts.model';

import { ImageUpPage } from 'src/app/auth/image-up/image-up.page';

@Component({
	selector: 'app-postcat',
	templateUrl: './postcat.page.html',
	styleUrls: ['./postcat.page.scss'],
})
export class PostcatPage implements OnInit {

	uid: any;
	crrntUsr: any;
	userRef: any;
	photoUrl: any;


	postCat: AngularFirestoreCollection<PostsCat>;
	postCat$: Observable<PostsCat[]>;
	postCatID: any[] = [];
	public parameterValue: any[] = [];

	post : any;
	allPost: Posts[] = [];

	constructor(
		public usersService: UserService,
		public recipesService: PostsService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		public db: AngularFirestore,
		private modalCtrl : ModalController
		) {}

	ngOnInit() {

		// Local storage information
		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;
		this.usersService.getUserDoc(id).subscribe(res => {
			this.userRef = res;
			this.photoUrl = this.userRef.photoUrl;

		});

		this.activatedRoute.params.subscribe(parameter => {
			this.parameterValue = parameter.postCatID
			console.log(this.parameterValue);
		});


		this.postCat = this.db.collection<{}>('posts_cat', ref => ref.where('id', '==', this.parameterValue));
		this.postCat$ = this.postCat.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data(); // DB Questions
				const id = a.payload.doc.id;
				return { id, ...data };
			}))
			);
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

}
