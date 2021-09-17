import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { INTRO_KEY } from 'src/app/auth/guards/intro.guard';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { Storage } from '@capacitor/storage';
import { MenuController } from '@ionic/angular';
 
@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  @ViewChild(IonSlides)slides: IonSlides;
 
  constructor(
    private router: Router,
    public menuCtrl: MenuController
    ) { }
 
  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
 
  next() {
    this.slides.slideNext();
  }

  previous() {
    this.slides.slidePrev();
  }
 
  async start() {
    await Storage.set({key: INTRO_KEY, value: 'true'});
    this.router.navigateByUrl('/sign-in', { replaceUrl:true });
  }
}