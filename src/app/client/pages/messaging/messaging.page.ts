import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from "src/app/auth/services/auth.service";
import { UserService } from 'src/app/auth/services/user.service';

import { MessagesService } from 'src/app/client/services/messages.service';
import { Messages } from 'src/app/client/models/messages.model';

import { FormArray, FormControl, FormBuilder, FormGroup } from '@angular/forms';

import { ImageUpPage } from 'src/app/auth/image-up/image-up.page';

@Component({
	selector: 'app-messaging',
	templateUrl: './messaging.page.html',
	styleUrls: ['./messaging.page.scss'],
})
export class MessagingPage implements OnInit {

	public messageForm: FormGroup;

	uid: any;
	crrntUsr: any;
	userRef: any;
	photoUrl: any;
	messages: any;


	constructor(
		public authService: AuthService,
		public usersService: UserService,
		private messageService: MessagesService,
		public formBuilder: FormBuilder,
		private modalCtrl : ModalController
		) { 
		this.messageForm = this.formBuilder.group({
			message: ['']
		});
	}

	ngOnInit() {

		// Local storage information
		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;
		this.usersService.getUserDoc(id).subscribe(res => {
			this.userRef = res;
			this.photoUrl = this.userRef.photoUrl;
		});

		//read my baskets 
		this.messageService.getUserMessages(this.uid).subscribe((data) => {
			this.messages = data.map((e) => {
				return {
					id: e.payload.doc.id,
					...(e.payload.doc.data() as {}),
				} as Messages;
			});
		});
	}

	get message(){
		return this.messageForm.get('message')
	}


	onSubmit() {
		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;
		this.messageService.createMessage(this.messageForm.value);
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
