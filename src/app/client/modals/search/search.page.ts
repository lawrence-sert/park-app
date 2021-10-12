import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/auth";
import { UserService } from 'src/app/auth/services/user.service';
import { FormArray, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  uid: any;
  crrntUsr: any;
  photoUrl : any;
  userRef : any;

  type: string;

  public productSearch: any[];
  public foodListBackup: any[];
  searched : boolean = false;

  constructor(
  	public afAuth: AngularFireAuth, // Inject Firebase auth service
    public usersService: UserService,
    public router: Router,
    public formBuilder: FormBuilder,
    private modalCtrl : ModalController,
    public db: AngularFirestore,
  	) { }

  async ngOnInit() {
  	this.type = 'market';
  	// Local storage information
    this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
    const id = this.crrntUsr.uid;
    this.usersService.getUserDoc(id).subscribe(res => {
      this.userRef = res;
      this.photoUrl = this.userRef.photoUrl;
    });

    this.productSearch = await this.initializeItems()
  }

  // search module starts here
  async initializeItems(): Promise<any> {
    const productSearch = await this.db.collection('products')
    .valueChanges().pipe(first()).toPromise();
    this.foodListBackup = productSearch;
    return productSearch;
  }

  async filterList(evt) {
    this.productSearch = await this.initializeItems();
    const searchTerm = evt.srcElement.value;


    if (!searchTerm) {
      this.searched = false;
      return;
    }

    this.productSearch = this.productSearch.filter(currentFood => {

      if (currentFood.item && searchTerm) {
        this.searched = true;
        return (currentFood.item.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }
  // search module ends here

  segmentChanged(ev: any) {
		console.log('Segment changed', ev);
	}


  closeModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
