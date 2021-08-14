import { Component, OnInit } from '@angular/core';
import { LocalNotificationService } from "src/app/services/local-notification.service";
import { UserService } from 'src/app/services/user.service';

import { TipsService } from 'src/app/services/tips.service';
import { Tips } from 'src/app/model/tips.model';

import { PostsService } from 'src/app/services/posts.service';
import { Posts } from 'src/app/model/posts.model';

import { PostsCatService } from 'src/app/services/posts-cat.service';
import { PostsCat } from 'src/app/model/posts-cat.model';



@Component({
	selector: 'app-dash',
	templateUrl: './dash.component.html',
	styleUrls: ['./dash.component.scss'],
})
export class DashComponent implements OnInit {

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

	tips : any;
	posts : any;
	posts_cat : any;

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
		private localNotification : LocalNotificationService,
		public  usersService: UserService,
		private tipsService: TipsService,
		private postsService: PostsService,
		private posts_catService: PostsCatService,
		) { 
		// Local storage information
		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;
		this.usersService.getUserDoc(id).subscribe(res => {
			this.userRef = res;
			this.firstrun = this.userRef.firstrun;
			this.firstname = this.userRef.firstname;
			this.lastname = this.userRef.surname;
			this.displayName = this.userRef.displayName;
			this.emailVerified = this.userRef.emailVerified;
			this.accountType = this.userRef.accountType;
			this.location = this.userRef.location;
		});
	}

	ngOnInit() {
		//read Tips 
		this.tipsService.getTips().subscribe((data) => {
			this.tips = data.map((e) => {
				return {
					id: e.payload.doc.id,
					...(e.payload.doc.data() as {}),
				} as Tips;
			});
		});

		//read Posts 
		this.postsService.getPosts().subscribe((data) => {
			this.posts = data.map((e) => {
				return {
					id: e.payload.doc.id,
					...(e.payload.doc.data() as {}),
				} as Posts;
			});
		});

		//read Posts Categories 
		this.posts_catService.getPostsCat().subscribe((data) => {
			this.posts_cat = data.map((e) => {
				return {
					id: e.payload.doc.id,
					...(e.payload.doc.data() as {}),
				} as PostsCat;
			});
		});

	}

	sendLocalNotification () {
		this.localNotification.showLocalNotification (  
			1, 
			"title", 
			"TEST NOTIFICATION"
			);
	}

}
