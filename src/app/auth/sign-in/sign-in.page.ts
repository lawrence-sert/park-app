import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/services/auth.service";
import { LoadingController, AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.page.html',
	styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

	constructor(
		private authService: AuthService,
		private alertCtrl: AlertController,
		private loadingCtrl: LoadingController,
		private modalCtrl: ModalController,
		private router: Router,
		private toastr: ToastrService,
		) { }

	ngOnInit() {
	}

}
