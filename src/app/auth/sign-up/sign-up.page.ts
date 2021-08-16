import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/auth/services/auth.service";
import {  MenuController } from '@ionic/angular';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  constructor(
	public authService: AuthService,
	public menuCtrl: MenuController,
	) {}

  ngOnInit() {
  }

  ionViewWillEnter() {
		this.menuCtrl.enable(false);
	}

}
