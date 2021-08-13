import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RecipesService } from 'src/app/services/recipes.service';
import {Recipes} from 'src/app/model/recipes.model';

import { ChefsService } from 'src/app/services/chefs.service';
import {Chefs} from 'src/app/model/chefs.model';



@Component({
	selector: 'app-recipe',
	templateUrl: './recipe.page.html',
	styleUrls: ['./recipe.page.scss'],
})
export class RecipePage implements OnInit {

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

	recipeRef: AngularFirestoreCollection<Recipes>;
	recipe$: Observable<Recipes[]>;
	recipeID: any[] = [];
	public parameterValue: any[] = [];

	chefRef: AngularFirestoreCollection<Chefs>;
	chef$: Observable<Recipes[]>;
	chef_id: any[] = [];


	type: string;

	constructor(
		public usersService: UserService,
		public recipesService: RecipesService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		public db: AngularFirestore
		) { 

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
			this.parameterValue = parameter.recipeID
		});

		
	}

	ngOnInit() {
		this.type = 'ingredients';

		this.recipeRef = this.db.collection<{}>('recipes', ref => ref.where('id', '==', this.parameterValue));
		this.recipe$ = this.recipeRef.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data(); // DB Questions
				const id = a.payload.doc.id;
				return { id, ...data };
			}))
			);
	}

	segmentChanged(ev: any) {
		console.log('Segment changed', ev);
	}

	addLike() {
		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;
		const pageId = this.parameterValue;
		this.recipesService.updateLike(pageId, id);
	}

}
