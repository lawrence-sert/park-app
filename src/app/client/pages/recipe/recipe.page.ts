import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/auth/services/user.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RecipesService } from 'src/app/client/services/recipes.service';
import {Recipes} from 'src/app/client/models/recipes.model';

import { ChefsService } from 'src/app/client/services/chefs.service';
import { Chefs } from 'src/app/client/models/chefs.model';

import { CommentPage } from 'src/app/client/modals/comment/comment.page';



@Component({
	selector: 'app-recipe',
	templateUrl: './recipe.page.html',
	styleUrls: ['./recipe.page.scss'],
})
export class RecipePage implements OnInit {

	uid: any;
	crrntUsr: any;
	userRef: any;
	photoUrl : any;

	modelData: any;

	recipeRef: AngularFirestoreCollection<Recipes>;
	recipe$: Observable<Recipes[]>;
	recipeID: any[] = [];
	public parameterValue: any[] = [];

	ingredientRef: AngularFirestoreCollection<Recipes>;
	ingredient$: Observable<Recipes[]>;

	methodRef: AngularFirestoreCollection<Recipes>;
	method$: Observable<Recipes[]>;

	nutritionRef: AngularFirestoreCollection<Recipes>;
	nutrition$: Observable<Recipes[]>;

	nutritionInfo: AngularFirestoreCollection<Recipes>;
	nutritionInfo$: Observable<Recipes[]>;

	commentsRef: AngularFirestoreCollection<Recipes>;
	comments$: Observable<Recipes[]>;

	chefRef: AngularFirestoreCollection<Chefs>;
	chef$: Observable<Chefs[]>;
	chef_id: any[] = [];


	type: string;

	constructor(
		public usersService: UserService,
		public recipesService: RecipesService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		public db: AngularFirestore,
		private modalCtrl : ModalController,
		) {}

	

	ngOnInit() {
		this.type = 'ingredients';
		// Local storage information
		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;
		this.uid = this.crrntUsr.uid;
		this.usersService.getUserDoc(id).subscribe(res => {
			this.userRef = res;
			this.photoUrl = this.userRef.photoUrl;
		});

		this.activatedRoute.params.subscribe(parameter => {
			this.parameterValue = parameter.recipeID
		});

		this.recipeRef = this.db.collection<{}>('recipes', ref => ref.where('id', '==', this.parameterValue));
		this.recipe$ = this.recipeRef.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data(); // DB Questions
				const id = a.payload.doc.id;
				return { id, ...data };
			}))
			);

		this.ingredientRef = this.db.collection<{}>(`recipes/${this.parameterValue}/ingredient`);
		this.ingredient$ = this.ingredientRef.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data(); // DB Questions
				const id = a.payload.doc.id;
				return { id, ...data };
			}))
			);

		this.methodRef = this.db.collection<{}>(`recipes/${this.parameterValue}/method`, ref => ref.orderBy('method_number','asc'));
		this.method$ = this.methodRef.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data(); // DB Questions
				const id = a.payload.doc.id;
				return { id, ...data };
			}))
			);

		this.nutritionRef = this.db.collection<{}>(`recipes/${this.parameterValue}/nutrition`);
		this.nutrition$ = this.nutritionRef.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data(); // DB Questions
				const id = a.payload.doc.id;
				return { id, ...data };
			}))
			);

		//nutrient value info
		this.nutritionInfo = this.db.collection<{}>(`recipes/${this.parameterValue}/nutrition/${this.parameterValue}/nutritionValue`);
		this.nutritionInfo$ = this.nutritionInfo.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data(); // DB Questions
				const id = a.payload.doc.id;
				return { id, ...data };
			}))
			);

		//nutrient value info
		this.commentsRef = this.db.collection<{}>(`recipes/${this.parameterValue}/comments`, ref => ref.orderBy('date','desc'));
		this.comments$ = this.commentsRef.snapshotChanges().pipe(
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
		this.recipesService.updateLike(pageId);
	}

	shareRecipe() {
		
	}

	async openCalModal() {
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
