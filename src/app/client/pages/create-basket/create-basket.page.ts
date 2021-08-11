import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from "src/app/services/auth.service";
import { UserService } from 'src/app/services/user.service';

import { AlertController, IonSlides } from '@ionic/angular';

//
import { BasketService } from 'src/app/services/basket.service';
import { Basket } from 'src/app/model/basket.model';

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


  @ViewChild('slideWithNav2', { static: false }) slideWithNav2: IonSlides;

  sliderTwo: any;
  slideOptsTwo = {
    initialSlide: 1,
    slidesPerView: 4,
    loop: true,
    centeredSlides: true,
    spaceBetween: 10
  };

  constructor(
  	private authService: AuthService,
    public usersService: UserService,
    private basketService: BasketService,
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
      this.photoURL = this.userRef.photoURL;
    });

   
  }

  ngOnInit() {
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

  //Move to Next slide
  slideNext(object, slideView) {
    slideView.slideNext(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }

  //Move to previous slide
  slidePrev(object, slideView) {
    slideView.slidePrev(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });;
  }

  //Method called when slide is changed by drag or navigation
  SlideDidChange(object, slideView) {
    this.checkIfNavDisabled(object, slideView);
  }

  //Call methods to check if slide is first or last to enable disbale navigation  
  checkIfNavDisabled(object, slideView) {
    this.checkisBeginning(object, slideView);
    this.checkisEnd(object, slideView);
  }

  checkisBeginning(object, slideView) {
    slideView.isBeginning().then((istrue) => {
      object.isBeginningSlide = istrue;
    });
  }
  checkisEnd(object, slideView) {
    slideView.isEnd().then((istrue) => {
      object.isEndSlide = istrue;
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
