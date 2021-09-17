import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Notifications } from 'src/app/client/models/notifications.model';
import { UserService } from 'src/app/auth/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
	providedIn: 'root'
})
export class NotificationsService {
	uid: any;
	crrntUsr: any;

	constructor(
		private firestore: AngularFirestore,
		public usersService: UserService,
		private toastr: ToastrService
		) {}

	//get user notifications
	getUserNotifications(uid) {
		return this.firestore.collection(`users/${uid}/notifications`).snapshotChanges();
	}

	deleteNotification(uid, Notificationid:string): Promise<void> {
		return this.firestore.collection(`users/${uid}/notifications/`).doc(Notificationid).delete()
		.then(() => {
			this.toastr.success('Notification Removed', '');
		}).catch((error) => {
			this.toastr.warning(error.message, 'Something Wrong');
		})
	}


}
