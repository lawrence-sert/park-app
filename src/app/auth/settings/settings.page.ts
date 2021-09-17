import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserService } from 'src/app/auth/services/user.service';
import { AlertController, IonSlides } from '@ionic/angular';
import { ImageUpPage } from 'src/app/auth/image-up/image-up.page';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.page.html',
	styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

	uid: any;
	crrntUsr: any;
	userRef: any;
	userEmail: any;
	firstname: any;
	lastname: any;
	displayName: any;
	email: any;
	emailVerified?: boolean;
	location: any;
	accountType?: any;
	firstrun : any;
	phone : any;
  photoUrl : any;

	constructor(
		public authService: AuthService,
		public usersService: UserService,
		public menuCtrl: MenuController,
		private alertCtrl: AlertController,
    private modalCtrl : ModalController
	) {}

	ngOnInit() {
    // Local storage information
    this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
    const id = this.crrntUsr.uid;
    this.uid = this.crrntUsr.uid;
    this.usersService.getUserDoc(id).subscribe(res => {
      this.userRef = res;
      this.firstrun = this.userRef.firstrun;
      this.firstname = this.userRef.firstname;
      this.lastname = this.userRef.surname;
      this.displayName = this.userRef.displayName;
      this.emailVerified = this.userRef.emailVerified;
      this.accountType = this.userRef.accountType;
      this.location = this.userRef.location;
      this.phone = this.userRef.phone;
      this.email = this.userRef.email;
      this.photoUrl = this.userRef.photoUrl;
    });
	}

	ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  async changePhone() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Change Your Phone Number',
      inputs: [
        {
          name: 'phone',
          type: 'text',
          placeholder: 'Phone Number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Change',
          handler: (data: any) => {
            console.log('Saved Information', data);
            this.usersService.changePhone(this.uid , data);
          }
        }
      ]
    });

    await alert.present();
  }


  //Change account type
  async changeAccountType() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Change Account Type',
      inputs: [
        {
          name: 'accountType',
          type: 'radio',
          label: 'Farmer',
          value: 'farmer',
          handler: () => {
            console.log('Farmer Selected');
          },
          checked: true
        },
        {
          name: 'accountType',
          type: 'radio',
          label: 'Vendor',
          value: 'vendor',
          handler: () => {
            console.log('Vendor Selected');
          }
        },
        {
          name: 'accountType',
          type: 'radio',
          label: 'Customer',
          value: 'customer',
          handler: () => {
            console.log('Customer Selected');
          }
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Change',
          handler: (data: any) => {
            console.log('Saved Information', data);
            this.usersService.changeAccountType(this.uid , data);
          }
        }
      ]
    });

    await alert.present();
  }

  //Change account type
  async changeLocation() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Change Account Type',
      inputs: [
        {
          name: 'location',
          type: 'radio',
          label: 'Kigali',
          value: 'Kigali',
          handler: () => {
            console.log('Kigali Selected');
          },
          checked: true
        },
        {
          name: 'location',
          type: 'radio',
          label: 'Northern Province',
          value: 'Northern Province',
          handler: () => {
            console.log('Northern Province Selected');
          }
        },
        {
          name: 'location',
          type: 'radio',
          label: 'Eastern Province',
          value: 'Eastern Province',
          handler: () => {
            console.log('Eastern Province Selected');
          }
        },
        {
          name: 'location',
          type: 'radio',
          label: 'Southern Province',
          value: 'Southern Province',
          handler: () => {
            console.log('Southern Province Selected');
          }
        },
        {
          name: 'location',
          type: 'radio',
          label: 'Western Province',
          value: 'Western Province',
          handler: () => {
            console.log('Western Province Selected');
          }
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Change',
          handler: (data: any) => {
            console.log('Saved Information', data);
            this.usersService.changeLocation(this.uid , data);
          }
        }
      ]
    });

    await alert.present();
  }

  async changeEmail() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Change Your Email',
      inputs: [
        {
          name: 'email',
          type: 'text',
          placeholder: 'Email Address'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Change',
          handler: (data: any) => {
            console.log('Saved Information', data);
            this.usersService.changeEmail(this.uid , data);
          }
        }
      ]
    });

    await alert.present();
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
