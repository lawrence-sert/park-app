import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage'
import { Router } from '@angular/router';
import { ModalController, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/auth/services/user.service';

@Component({
	selector: 'app-post-options',
	templateUrl: './post-options.page.html',
	styleUrls: ['./post-options.page.scss'],
})
export class PostOptionsPage implements OnInit {

	uid: any;
	crrntUsr : any;
	userRef : any;
	photoUrl: any;

	constructor(
		private database: AngularFirestore, 
		private storage: AngularFireStorage,
		private router: Router, 
		private loading :LoadingController, 
		private userService: UserService,
		private modalCtr: ModalController
		) { }

	ngOnInit() {
		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;
		this.userService.getUserDoc(id).subscribe(res => {
			this.userRef = res;
			this.photoUrl = this.userRef.photoUrl;
		});
	}

	closeModal() {
		this.modalCtr.dismiss({
			'dismissed': true
		});
	}

}
