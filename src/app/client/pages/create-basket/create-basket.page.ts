import { Component, OnInit} from '@angular/core';
import { AlertController, IonSlides, ModalController } from '@ionic/angular';
import { AuthService } from "src/app/auth/services/auth.service";
import { UserService } from 'src/app/auth/services/user.service';



import { BasketService } from 'src/app/client/services/basket.service';
import { Basket } from 'src/app/client/models/basket.model';

import { ImageUpPage } from 'src/app/auth/image-up/image-up.page';

@Component({
  selector: 'app-create-basket',
  templateUrl: './create-basket.page.html',
  styleUrls: ['./create-basket.page.scss'],
})
export class CreateBasketPage implements OnInit {

  myDate = new Date();

  uid: any;
  crrntUsr: any;
  userRef: any;
  photoUrl: any;

  //basket
  basket : any;
  title : any;

  constructor(
  	public authService: AuthService,
    public usersService: UserService,
    private basketService: BasketService,
    private alertCtrl: AlertController,
    private modalCtrl : ModalController

    ) { }

  ngOnInit() {
    // Local storage information
    this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
    const id = this.crrntUsr.uid;
    this.usersService.getUserDoc(id).subscribe(res => {
      this.userRef = res;
      this.photoUrl = this.userRef.photoUrl;
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

  async createBasketPrompt() {

    const alert = await this.alertCtrl.create({

      cssClass: 'alertHeader',
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
