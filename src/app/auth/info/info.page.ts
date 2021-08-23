import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from 'src/app/auth/services/user.service';
import { Router } from "@angular/router";
import { MenuController } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';
import { FormArray, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { ImageUpPage } from 'src/app/auth/image-up/image-up.page';

@Component({
	selector: 'app-info',
	templateUrl: './info.page.html',
	styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

	public editForm: FormGroup;

	userData: any; // Save logged in user data
	userInfo: any; // Save logged in user data

	uid: any;
	crrntUsr: any;
	userRef: any;
	userEmail: any;
	displayName: any;
	email: any;
	emailVerified?: boolean;
	firstrun : any;
	photoUrl : any;

	constructor(
		private db : AngularFirestore,
		public usersService: UserService,
		private modalCtrl : ModalController,
		public formBuilder: FormBuilder,
		public router: Router
		) { }

	ngOnInit() {
		// Local storage information
		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;
		this.usersService.getUserDoc(id).subscribe(res => {
			this.userRef = res;
			this.displayName = this.userRef.displayName;
			this.emailVerified = this.userRef.emailVerified;
			this.photoUrl = this.userRef.photoUrl;
		});
		this.editForm = this.formBuilder.group({
			firstname: [''],
			lastname: [''],
			phone: [''],
			accountType: [''],
			location: [''],
		})
	}

	// Form Getters
	get firstname(){
		return this.editForm.get('firstname')
	}
	get lastname(){
		return this.editForm.get('lastname')
	}
	get phone(){
		return this.editForm.get('phone')
	}
	get accountType(){
		return this.editForm.get('accountType')
	}
	get location(){
		return this.editForm.get('location')
	}

	onSubmit() {
		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;
		this.usersService.updateUser(this.editForm.value, id);
		this.router.navigate(['/dashboard']);  
	}

	async openCalModal() {
		const modal = await this.modalCtrl.create({
			component: ImageUpPage,
			cssClass: 'app-image-up',
			backdropDismiss: false
		});
		await modal.present();
	}

}
