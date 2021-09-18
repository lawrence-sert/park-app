import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { RecipesService } from 'src/app/client/services/recipes.service';
import { Recipes } from 'src/app/client/models/recipes.model';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-watch',
	templateUrl: './watch.component.html',
	styleUrls: ['./watch.component.scss'],
})
export class WatchComponent implements OnInit {


	crrntUsr: any;
	userRef: any;

	constructor(
		private recipesService: RecipesService,
		public db: AngularFirestore,
		) { }

	ngOnInit() {

		// Local storage information
		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;

	}

}
