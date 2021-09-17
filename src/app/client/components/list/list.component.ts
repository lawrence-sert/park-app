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

  //basket
  basket : any;
  title : any;

  constructor(
    public usersService: UserService,
    private basketService: BasketService,
    private alertCtrl: AlertController,
  	) { }

  ngOnInit() {
    // Local storage information
    this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
    const id = this.crrntUsr.uid;
  	//read my baskets 
    this.basketService.getBasket(id).subscribe((data) => {
      this.basket = data.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as {}),
        } as Basket;
      });
    });
  }


  async createBasketPrompt() {

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

  async deleteBasket(basket_id) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Confirm Basket Delete',
      message: '<small>You are about to delete a basket. This action can not be undone.<br> Are you sure to proceed</small>',
      buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Delete',
        handler: () => {
          console.log('Confirm Okay');
          console.log(basket_id);
          this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
          const id = this.crrntUsr.uid;
          this.basketService.deleteBasket(id, basket_id);
        }
      }
      ]
    });

    await alert.present();
  }

}
