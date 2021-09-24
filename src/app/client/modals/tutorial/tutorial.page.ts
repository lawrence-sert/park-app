import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController, IonSlides } from '@ionic/angular';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthService } from "src/app/auth/services/auth.service";
import { UserService } from 'src/app/auth/services/user.service';
import { FormArray, FormControl, FormBuilder, FormGroup } from '@angular/forms';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TutorialsService } from 'src/app/client/services/tutorials.service';
import { Tutorials } from 'src/app/client/models/tutorials.model';

@Component({
	selector: 'app-tutorial',
	templateUrl: './tutorial.page.html',
	styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {
	@ViewChild(IonSlides)slides: IonSlides;
	@Input() pageId: string;

	uid: any;
	crrntUsr: any;
	userRef: any;
	photoUrl : any;

	tutorialRef: AngularFirestoreCollection<Tutorials>;
	tutorial$: Observable<Tutorials[]>;

	slide: any;
	public parameterValue: any[] = [];

	constructor(
		public afAuth: AngularFireAuth, // Inject Firebase auth service
		public authService: AuthService,
		public usersService: UserService,
		public tutorialsService: TutorialsService,
		public router: Router,
		public formBuilder: FormBuilder,
		private modalCtrl : ModalController,
		public db: AngularFirestore,
		) { }

	ngOnInit() {
		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;
		this.uid = this.crrntUsr.uid;
		this.usersService.getUserDoc(id).subscribe(res => {
			this.userRef = res;
			this.photoUrl = this.userRef.photoUrl;
		});

		this.tutorialRef = this.db.collection<{}>(`tutorials`, ref => ref.where('id','==',this.pageId));
		this.tutorial$ = this.tutorialRef.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data(); // DB Questions
				const id = a.payload.doc.id;
				return { id, ...data };
			}))
			);

		//read tutorials 
		this.tutorialsService.getSlides(this.pageId).subscribe((data) => {
			this.slide = data.map((e) => {
				return {
					id: e.payload.doc.id,
					...(e.payload.doc.data() as {}),
				} as Tutorials;
			});
		});
	}

	next() {
    this.slides.slideNext();
  }

  previous() {
    this.slides.slidePrev();
  }

	closeModal() {
		this.modalCtrl.dismiss({
			'dismissed': true
		});
	}

}
