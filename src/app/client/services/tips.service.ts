import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Tips } from 'src/app/client/models/tips.model';
import { UserService } from 'src/app/auth/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class TipsService {

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

  getTips() {
		return this.firestore.collection('tips').snapshotChanges();
	}
}
