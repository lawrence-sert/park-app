import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Tutorials } from 'src/app/client/models/tutorials.model';
import { UserService } from 'src/app/auth/services/user.service';
@Injectable({
  providedIn: 'root'
})
export class TutorialsService {

  constructor(
  	private firestore: AngularFirestore,
  	public usersService: UserService,
  	) { }

  getTutorials() {
		return this.firestore.collection('tutorials').snapshotChanges();
	}

	getSlides(pageId) {
		return this.firestore.collection(`tutorials/${pageId}/slides`).snapshotChanges();
	}
}
