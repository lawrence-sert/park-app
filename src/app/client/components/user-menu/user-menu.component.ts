import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserService } from 'src/app/auth/services/user.service';

import { AlertController, IonSlides } from '@ionic/angular';

import { NotificationsService } from 'src/app/client/services/notifications.service';
import { Notifications } from 'src/app/client/models/notifications.model';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent implements OnInit {
	uid: any;
  crrntUsr: any;
  userRef: any;
  userEmail: any;
  firstname: any;
  lastname: any;
  displayName: any;
  email: any;
  emailVerified?: boolean;
  photoURL: any;
  accountType?: any;

  notifications : any;


  constructor(
  	public authService: AuthService,
    public usersService: UserService,
    private notificationsService: NotificationsService,
    private alertCtrl: AlertController,
  	) { }

  ngOnInit() {
  	// Local storage information
    this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
    const id = this.crrntUsr.uid;
    this.uid = this.crrntUsr.uid;
    this.usersService.getUserDoc(id).subscribe(res => {
      this.userRef = res;
      this.firstname = this.userRef.firstname;
      this.lastname = this.userRef.surname;
      this.displayName = this.userRef.displayName;
      this.emailVerified = this.userRef.emailVerified;
      this.accountType = this.userRef.accountType;
      this.photoURL = this.userRef.photoURL;
    });

    //read my baskets 
    this.notificationsService.getUserNotifications(this.uid).subscribe((data) => {
      this.notifications = data.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as {}),
        } as Notifications;
      });
    });
  }

  deleteNotification(Notificationid) {
    this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
    const id = this.crrntUsr.uid;
    this.notificationsService.deleteNotification(id, Notificationid );
  }



}
