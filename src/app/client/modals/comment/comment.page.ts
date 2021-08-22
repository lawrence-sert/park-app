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

import { CommentsService } from 'src/app/client/modals/services/comments.service';
import {Comments} from 'src/app/client/modals/models/comments.model';



@Component({
  selector: 'app-comment',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit {

	// Data passed in by componentProps
  @Input() pageId: string;

  commentRef: AngularFirestoreCollection<Comments>;
  comment$: Observable<Comments[]>;


  public commentForm: FormGroup;

  uid: any;
  crrntUsr: any;
  photoUrl : any;
  userRef : any;



  constructor(
  	public afAuth: AngularFireAuth, // Inject Firebase auth service
    public authService: AuthService,
    public usersService: UserService,
    public commentService: CommentsService,
    public router: Router,
    public formBuilder: FormBuilder,
    private modalCtrl : ModalController,
    public db: AngularFirestore,
    ) { 
  	this.commentForm = this.formBuilder.group({
      comment: ['']
    })
  }

  ngOnInit() {
  	// Local storage information
    this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
    const id = this.crrntUsr.uid;
    this.uid = this.crrntUsr.uid;
    this.usersService.getUserDoc(id).subscribe(res => {
      this.userRef = res;
      this.photoUrl = this.userRef.photoUrl;
    });

    this.commentRef = this.db.collection<{}>(`recipes/${this.pageId}/comments`, ref => ref.orderBy('date','desc'));
    this.comment$ = this.commentRef.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data(); // DB Questions
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
      );
  }

  // Form Getters
  get comment(){
    return this.commentForm.get('comment')
  }

  onSubmit() {
    this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
    const id = this.crrntUsr.uid;
    this.commentService.createComment(this.commentForm.value, this.pageId);
  }



  async closeModel() {
    const close: string = "Modal Removed";
    await this.modalCtrl.dismiss(close);
  }

}
