import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from "src/app/services/auth.service";
import { UserService } from 'src/app/services/user.service';
import { AlertController, IonSlides } from '@ionic/angular';

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

	constructor(
		public authService: AuthService,
		public usersService: UserService,
		public menuCtrl: MenuController,
		private alertCtrl: AlertController,
	) { 
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
    });
	}

	ngOnInit() {
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

}
