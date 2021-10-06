import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { TipsService } from 'src/app/client/services/tips.service';
import { Tips } from 'src/app/client/models/tips.model';

import { PostsService } from 'src/app/client/services/posts.service';
import { Posts } from 'src/app/client/models/posts.model';

import { PostsCatService } from 'src/app/client/services/posts-cat.service';
import { PostsCat } from 'src/app/client/models/posts-cat.model';

import { first } from 'rxjs/operators';






@Component({
	selector: 'app-dash',
	templateUrl: './dash.component.html',
	styleUrls: ['./dash.component.scss'],
})
export class DashComponent implements OnInit {



	tips: any;
	oneTip: any;
	allTips: Tips[] = [];



	posts: any;
	postsCat: any;

	 public productSearch: any[];
  public foodListBackup: any[];

  searched : boolean = false;

	public slideOpts = {
		slidesPerView: 3,
		spaceBetween: 30,
		centeredSlides: true,
		initialSlide: 3,
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

					const slideTransform =
					`translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

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
		private tipsService: TipsService,
		private postsService: PostsService,
		private postsCatService: PostsCatService,
		private db: AngularFirestore,
		) {}

	async ngOnInit() {


		this.productSearch = await this.initializeItems();

		const randomNumber = Math.floor(Math.random() * 3) + 1;

		console.log(randomNumber);

		//read Tips
		this.tips = this.db.collection('/tips', ref => ref.orderBy('date', 'desc'))
		.valueChanges({ idField: 'id'})
		.subscribe((tips) => {
			this.allTips = tips;
		});

		//read Posts
		this.postsService.getPosts().subscribe((data) => {
			this.posts = data.map((e)=>{
				return {
					id: e.payload.doc.id,
					...(e.payload.doc.data() as {}),
				} as Posts;
			});
		});

		//read Posts Categories
		this.postsCatService.getPostsCat().subscribe((data) => {
			this.postsCat = data.map((e) => {
				return {
					id: e.payload.doc.id,
					...(e.payload.doc.data() as {}),
				} as PostsCat;
			});
		});

	}

	// search module starts here
  async initializeItems(): Promise<any> {
    const productSearch = await this.db.collection('posts')
    .valueChanges().pipe(first()).toPromise();
    this.foodListBackup = productSearch;
    return productSearch;
  }

  async filterList(evt) {
    this.productSearch = await this.initializeItems();
    const searchTerm = evt.srcElement.value;


    if (!searchTerm) {
      this.searched = false;
      return;
    }

    this.productSearch = this.productSearch.filter(currentFood => {

      if (currentFood.post_title && searchTerm) {
        this.searched = true;
        return (currentFood.post_title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }
  // search module ends here


}
