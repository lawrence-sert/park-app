import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/auth/services/auth.service";
import {  MenuController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  constructor(
	public authService: AuthService,
	public menuCtrl: MenuController
	) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
		this.menuCtrl.enable(false);
	}

}
