import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Posts } from 'src/app/client/models/posts.model';
import { UserService } from 'src/app/auth/services/user.service';
import { ToastrService } from 'ngx-toastr';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
	uid: any;
	crrntUsr: any;
  constructor(
  	private firestore: AngularFirestore,
  	public usersService: UserService,
    private toastr: ToastrService
    ) {
  	// Local storage information
    this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
    const id = this.crrntUsr.uid;
  }

  getPosts() {
    return this.firestore.collection('posts', ref => ref.orderBy('post_date', 'desc')).snapshotChanges();
  }

  createPostBookmark(id, data) {

  }

  updateLike(pageId, id) {
    //add a like to main recipes
    var that = this;
    this.firestore.firestore.collection("posts").where("id", "==", pageId)
    .get()
    .then(function(querySnapshot) {

      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());

        return that.firestore.firestore.runTransaction(function(transaction) {
          // This code may get re-run multiple times if there are conflicts.
          return transaction.get(doc.ref).then(function(doc) {
            if (!doc.exists) {
              throw "Document does not exist!";
            }

            //THIS IS WHERE TO DO THE INCREMENT
            var new_score = doc.data().post_like + 1;
            transaction.update(doc.ref, { post_like: new_score });
          });
        }).then(function() {

          return this.firestore
          .collection(`users/${id}/posts`)
          .add({
            post_id : pageId,
            date : firebase.default.firestore.FieldValue.serverTimestamp()
          });

        }).catch(function(error) {

        });

      });
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });
  }
}
