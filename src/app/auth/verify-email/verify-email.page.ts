import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {

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
