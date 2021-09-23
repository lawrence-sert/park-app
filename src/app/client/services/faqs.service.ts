import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Faqs } from 'src/app/client/models/faqs.model';
import { UserService } from 'src/app/auth/services/user.service';
import { ToastrService } from 'ngx-toastr';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FaqsService {

  constructor(
  	private firestore: AngularFirestore,
  	public usersService: UserService,
    private toastr: ToastrService
  	) { }

   getFaq() {
    return this.firestore.collection('faqs', ref => ref.orderBy('date', 'desc')).snapshotChanges();
  }
}
