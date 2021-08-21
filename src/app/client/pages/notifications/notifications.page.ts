import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from 'src/app/auth/services/user.service';

import { ImageUpPage } from 'src/app/auth/image-up/image-up.page';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  uid: any;
  crrntUsr: any;
  userRef: any;
  userEmail: any;
  firstname: any;
  lastname: any;
  displayName: any;
  email: any;
  emailVerified?: boolean;
  photoUrl: any;
  accountType?: any;


  constructor(
  	private db : AngularFirestore,
    public usersService: UserService,
    private modalCtrl : ModalController
  	) { 

  }

  ngOnInit() {
  	// Local storage information
    this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
    const id = this.crrntUsr.uid;
    this.usersService.getUserDoc(id).subscribe(res => {
      this.userRef = res;
      this.firstname = this.userRef.firstname;
      this.lastname = this.userRef.surname;
      this.displayName = this.userRef.displayName;
      this.emailVerified = this.userRef.emailVerified;
      this.accountType = this.userRef.accountType;
      this.photoUrl = this.userRef.photoUrl;
    });
  }

  async openCalModal() {
    const modal = await this.modalCtrl.create({
      component: ImageUpPage,
      cssClass: 'app-image-up',
      backdropDismiss: false
    });

    await modal.present();

  }

  async close() {
    const closeModal: string = "Modal Closed";
    await this.modalCtrl.dismiss(closeModal);
  }

}
