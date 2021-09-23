import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthService } from "src/app/auth/services/auth.service";
import { UserService } from 'src/app/auth/services/user.service';
import { FormArray, FormControl, FormBuilder, FormGroup } from '@angular/forms';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FaqsService } from 'src/app/client/services/faqs.service';
import { Faqs } from 'src/app/client/models/faqs.model';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {

	@Input() pageId: string;

	uid: any;
	crrntUsr: any;
	userRef: any;
	photoUrl : any;

	faqRef: AngularFirestoreCollection<Faqs>;
	faq$: Observable<Faqs[]>;
	faqID: any[] = [];
	public parameterValue: any[] = [];

  constructor(
  	public afAuth: AngularFireAuth, // Inject Firebase auth service
    public authService: AuthService,
    public usersService: UserService,
    public faqService: FaqsService,
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

    this.faqRef = this.db.collection<{}>(`faqs`, ref => ref.where('id','==',this.pageId));
    this.faq$ = this.faqRef.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data(); // DB Questions
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
      );

  }

  closeModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
