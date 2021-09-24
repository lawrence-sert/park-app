import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController} from '@ionic/angular';
import { AuthService } from "src/app/auth/services/auth.service";
import { UserService } from 'src/app/auth/services/user.service';

import { MessagesService } from 'src/app/client/services/messages.service';
import { Messages } from 'src/app/client/models/messages.model';

import { FaqsService } from 'src/app/client/services/faqs.service';
import { Faqs } from 'src/app/client/models/faqs.model';

import { TutorialsService } from 'src/app/client/services/tutorials.service';
import { Tutorials } from 'src/app/client/models/tutorials.model';

import { FormArray, FormControl, FormBuilder, FormGroup } from '@angular/forms';

import { ImageUpPage } from 'src/app/auth/image-up/image-up.page';
import { FaqPage } from 'src/app/client/modals/faq/faq.page';
import { TutorialPage } from 'src/app/client/modals/tutorial/tutorial.page';

@Component({
	selector: 'app-messaging',
	templateUrl: './messaging.page.html',
	styleUrls: ['./messaging.page.scss'],
})
export class MessagingPage implements OnInit {

	public messageForm: FormGroup;


	type: string;

	modelData: any;

	uid: any;
	crrntUsr: any;
	userRef: any;
	photoUrl: any;
	messagecreated : any;

	messages: any;
	faqs: any;
	tutorials: any;

	


	constructor(
		public authService: AuthService,
		public usersService: UserService,
		private messageService: MessagesService,
		private faqsService: FaqsService,
		private tutorialsService: TutorialsService,
		public formBuilder: FormBuilder,
		private modalCtrl : ModalController,
		public alertCtrl: AlertController
		) { 
		this.messageForm = this.formBuilder.group({
			message: ['']
		});
	}

	ngOnInit() {

		this.type = 'messaging';

		// Local storage information
		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;
		this.usersService.getUserDoc(id).subscribe(res => {
			this.userRef = res;
			this.photoUrl = this.userRef.photoUrl;
			this.messagecreated = this.userRef.messagecreated;
		});

		//read my baskets 
		this.messageService.getUserMessages().subscribe((data) => {
			this.messages = data.map((e) => {
				return {
					id: e.payload.doc.id,
					...(e.payload.doc.data() as {}),
				} as Messages;
			});
		});

		//read faqs 
		this.faqsService.getFaq().subscribe((data) => {
			this.faqs = data.map((e) => {
				return {
					id: e.payload.doc.id,
					...(e.payload.doc.data() as {}),
				} as Faqs;
			});
		});

		//read tutorials 
		this.tutorialsService.getTutorials().subscribe((data) => {
			this.tutorials = data.map((e) => {
				return {
					id: e.payload.doc.id,
					...(e.payload.doc.data() as {}),
				} as Tutorials;
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

  async openFaqModal(faqId) {
		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;
		const pageId = faqId;
		const modal = await this.modalCtrl.create({
			component: FaqPage,
			cssClass: 'app-faq',
			backdropDismiss: false,
			componentProps: {
				'pageId': pageId
			}
		});

		modal.onDidDismiss().then((modelData) => {
			if (modelData !== null) {
				this.modelData = modelData.data;
				console.log('Modal Data : ' + modelData.data);
			}
		});

		await modal.present();

	}

  async close() {
    const closeModal: string = "Modal Closed";
    await this.modalCtrl.dismiss(closeModal);
  }

  async openTutorialModal(tutorialId) {
		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;
		const pageId = tutorialId;
		const modal = await this.modalCtrl.create({
			component: TutorialPage,
			cssClass: 'app-tutorial',
			backdropDismiss: false,
			componentProps: {
				'pageId': pageId
			}
		});

		modal.onDidDismiss().then((modelData) => {
			if (modelData !== null) {
				this.modelData = modelData.data;
				console.log('Modal Data : ' + modelData.data);
			}
		});

		await modal.present();

	

  }


  segmentChanged(ev: any) {
		console.log('Segment changed', ev);
	}


	async messageConfirm() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Messaging',
      message: 'Welcome to our customer chat platform',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'I Agree',
          handler: () => {
            this.usersService.openMessage();
            this.usersService.addMessages();
            this.usersService.updateMessage();
          }
        }
      ]
    });

    await alert.present();
  }

}
