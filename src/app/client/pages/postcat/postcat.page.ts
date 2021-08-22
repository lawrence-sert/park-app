import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/auth/services/user.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PostsCatService } from 'src/app/client/services/posts-cat.service';
import {PostsCat} from 'src/app/client/models/posts-cat.model';

import { PostsService } from 'src/app/client/services/posts.service';
import {Posts} from 'src/app/client/models/posts.model';

@Component({
	selector: 'app-postcat',
	templateUrl: './postcat.page.html',
	styleUrls: ['./postcat.page.scss'],
})
export class PostcatPage implements OnInit {

	uid: any;
	crrntUsr: any;
	userRef: any;
	userEmail: any;
	firstname: any;
	lastname: any;
	displayName: any;
	email: any;
	emailVerified?: boolean;
	location: any;
	accountType?: any;
	firstrun : any;
	phone : any;

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
		public db: AngularFirestore
		) { 
		
	}

	ngOnInit() {

		// Local storage information
		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;
		this.uid = this.crrntUsr.uid;
		this.usersService.getUserDoc(id).subscribe(res => {
			this.userRef = res;
			this.firstrun = this.userRef.firstrun;
			this.firstname = this.userRef.firstname;
			this.lastname = this.userRef.surname;
			this.displayName = this.userRef.displayName;
			this.emailVerified = this.userRef.emailVerified;
			this.accountType = this.userRef.accountType;
			this.location = this.userRef.location;
			this.phone = this.userRef.phone;
			this.email = this.userRef.email;
		});

		this.activatedRoute.params.subscribe(parameter => {
			this.parameterValue = parameter.postCatID
		});


		this.postCat = this.db.collection<{}>('posts_cat', ref => ref.where('id', '==', this.parameterValue));
		this.postCat$ = this.postCat.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data(); // DB Questions
				const id = a.payload.doc.id;
				return { id, ...data };
			}))
			);

		//Veggies Queries
		this.post = this.db.collection('/posts', ref => ref.where('post_category', '==', this.parameterValue))
		.valueChanges({ idField: 'id'})
		.subscribe((posts_cat) => {
			this.allPost = posts_cat;
		});
	}

}
