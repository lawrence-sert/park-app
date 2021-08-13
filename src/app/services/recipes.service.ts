import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Recipes } from 'src/app/model/recipes.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(
  	private firestore: AngularFirestore
  	) { }

  getRecipes() {
		return this.firestore.collection('recipes').snapshotChanges();
	}
}
