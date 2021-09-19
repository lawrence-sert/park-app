import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Combos } from 'src/app/client/models/combos.model';
import { UserService } from 'src/app/auth/services/user.service';
import { ToastrService } from 'ngx-toastr';
import * as firebase from 'firebase';

@Injectable({
	providedIn: 'root'
})
export class CombosService {

	constructor(
		private firestore: AngularFirestore,
		public usersService: UserService,
		private toastr: ToastrService
		) { }

	getCombos() {
		return this.firestore.collection('combos', ref => ref.orderBy('combo_date', 'desc')).snapshotChanges();
	}
}
