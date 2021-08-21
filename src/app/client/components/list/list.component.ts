import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/auth/services/auth.service";
import { UserService } from 'src/app/auth/services/user.service';

import { AlertController, IonSlides } from '@ionic/angular';

//
import { BasketService } from 'src/app/client/services/basket.service';
import { Basket } from 'src/app/client/models/basket.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

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
  firstrun : any;

  //basket
  basket : any;
  title : any;

  constructor(
  	public authService: AuthService,
    public usersService: UserService,
    private basketService: BasketService,
    private alertCtrl: AlertController,
  	) { 
  	
  }

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
      this.photoURL = this.userRef.photoURL;
    });
  	//read my baskets 
    this.basketService.getBasket(this.uid).subscribe((data) => {
      this.basket = data.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as {}),
        } as Basket;
      });
    });
  }


  async presentAlertPrompt() {

    const alert = await this.alertCtrl.create({

      cssClass: 'my-custom-class',
      header: 'Create A Basket',
      inputs: [
        {
          name: 'basket_name',
          type: 'text',
          placeholder: 'Basket Name ?'
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
          text: 'Create',
          handler: (data: any) => {
            console.log('Saved Information', data);
            this.basketService.createBasket(this.uid , data);
          }
        }
      ]
    });

    await alert.present();
  }

}
