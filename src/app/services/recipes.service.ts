import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Recipes } from 'src/app/model/recipes.model';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

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

  getRecipes() {
		return this.firestore.collection('recipes').snapshotChanges();
	}

	updateLike(pageId, id) {
    return this.firestore
		.collection(`users/${id}/recipes`)
		.add({
			recipe_id : pageId,
		});
	}
}
