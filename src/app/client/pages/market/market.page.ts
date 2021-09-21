import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from 'src/app/auth/services/user.service';

import { ProductsService } from 'src/app/client/services/products.service';
import { Product } from 'src/app/client/models/product.model';

import { PromotionsService } from 'src/app/client/services/promotions.service';
import { Promotions } from 'src/app/client/models/promotions.model';

import { ImageUpPage } from 'src/app/auth/image-up/image-up.page';

@Component({
  selector: 'app-market',
  templateUrl: './market.page.html',
  styleUrls: ['./market.page.scss'],
})
export class MarketPage implements OnInit {

	uid: any;
  crrntUsr: any;
  userRef: any;
  photoUrl: any;


  products : any;

  allVeggies: Product[] = [];
  veggies : any;
  veggieList: Promotions[] = [];
  vegProms : any;


  allFruits : Product[] = [];
  fruits : any;
  fruitList: Promotions[] = [];
  fruitProms : any;


  allFoods : Product[] = [];
  foods : any;
  foodList: Promotions[] = [];
  foodProms : any;


  allCare : Product[] = [];
  care : any;
  careList: Promotions[] = [];
  careProms : any;



  type: string;

  public slideOpts = {
    slidesPerView: 1.2,
    spaceBetween: 50,
    centeredSlides: true,
    initialSlide: 2,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 200,
      modifier: 1,
      slideShadows: false,
    },
    on: {
      beforeInit() {
        const swiper = this;

        swiper.classNames.push(`${swiper.params.containerModifierClass}coverflow`);
        swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);

        swiper.params.watchSlidesProgress = true;
        swiper.originalParams.watchSlidesProgress = true;
      },
      setTranslate() {
        const swiper = this;
        const {
          width: swiperWidth, height: swiperHeight, slides, $wrapperEl, slidesSizesGrid, $
        } = swiper;
        const params = swiper.params.coverflowEffect;
        const isHorizontal = swiper.isHorizontal();
        const transform$$1 = swiper.translate;
        const center = isHorizontal ? -transform$$1 + (swiperWidth / 2) : -transform$$1 + (swiperHeight / 2);
        const rotate = isHorizontal ? params.rotate : -params.rotate;
        const translate = params.depth;
        // Each slide offset from center
        for (let i = 0, length = slides.length; i < length; i += 1) {
          const $slideEl = slides.eq(i);
          const slideSize = slidesSizesGrid[i];
          const slideOffset = $slideEl[0].swiperSlideOffset;
          const offsetMultiplier = ((center - slideOffset - (slideSize / 2)) / slideSize) * params.modifier;

          let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
          let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
          // var rotateZ = 0
          let translateZ = -translate * Math.abs(offsetMultiplier);

          let translateY = isHorizontal ? 0 : params.stretch * (offsetMultiplier);
          let translateX = isHorizontal ? params.stretch * (offsetMultiplier) : 0;

          // Fix for ultra small values
          if (Math.abs(translateX) < 0.001) translateX = 0;
          if (Math.abs(translateY) < 0.001) translateY = 0;
          if (Math.abs(translateZ) < 0.001) translateZ = 0;
          if (Math.abs(rotateY) < 0.001) rotateY = 0;
          if (Math.abs(rotateX) < 0.001) rotateX = 0;

          const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

          $slideEl.transform(slideTransform);
          $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;

        }

        // Set correct perspective for IE10
        if (swiper.support.pointerEvents || swiper.support.prefixedPointerEvents) {
          const ws = $wrapperEl[0].style;
          ws.perspectiveOrigin = `${center}px 50%`;
        }
      },
      setTransition(duration) {
        const swiper = this;
        swiper.slides
        .transition(duration)
        .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
        .transition(duration);
      }
    }
  }

  constructor(
    private db : AngularFirestore,
    public usersService: UserService,
    private productsService: ProductsService,
    private promotionService: PromotionsService,
    private modalCtrl : ModalController
    ) { }

  ngOnInit() {

    // Local storage information
    this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
    const id = this.crrntUsr.uid;
    this.usersService.getUserDoc(id).subscribe(res => {
      this.userRef = res;
      this.photoUrl = this.userRef.photoUrl;
      console.log(this.photoUrl);
    });


    //get segment start
    this.type = 'vegitables';
    //read vegitables 
    this.productsService.getProducts().subscribe((data) => {
      this.products = data.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as {}),
        } as Product;
      });
    });


    //Veggies Queries
    this.veggies = this.db.collection('/products', ref => ref.where('category', '==', 'vegetables'))
    .valueChanges({ idField: 'id'})
    .subscribe((products) => {
      this.allVeggies = products;
    });

    this.vegProms = this.db.collection('/promotions', ref => ref.where('promotion_category', '==', 'vegetables'))
    .valueChanges({ idField: 'id'})
    .subscribe((promotions) => {
      this.veggieList = promotions;
    });



    //Fruits queries
    this.fruits = this.db.collection('/products', ref => ref.where('category', '==', 'fruits'))
    .valueChanges({ idField: 'id'})
    .subscribe((products) => {
      this.allFruits = products;
    });

    this.fruitProms = this.db.collection('/promotions', ref => ref.where('promotion_category', '==', 'fruits'))
    .valueChanges({ idField: 'id'})
    .subscribe((promotions) => {
      this.fruitList = promotions;
    });


    //Processed food queries
    this.foods = this.db.collection('/products', ref => ref.where('category', '==', 'foods'))
    .valueChanges({ idField: 'id'})
    .subscribe((products) => {
      this.allFoods = products;
    });

    this.foodProms = this.db.collection('/promotions', ref => ref.where('promotion_category', '==', 'foods'))
    .valueChanges({ idField: 'id'})
    .subscribe((promotions) => {
      this.foodList = promotions;
    });


    //Home Care Queries
    this.care = this.db.collection('/products', ref => ref.where('category', '==', 'care'))
    .valueChanges({ idField: 'id'})
    .subscribe((products) => {
      this.allCare = products;
    });

    this.careProms = this.db.collection('/promotions', ref => ref.where('promotion_category', '==', 'care'))
    .valueChanges({ idField: 'id'})
    .subscribe((promotions) => {
      this.careList = promotions;
    });



  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
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
