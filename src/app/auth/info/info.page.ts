import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from 'src/app/auth/services/user.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';
import { FormArray, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { ImageUpPage } from 'src/app/auth/image-up/image-up.page';

import {Provinces} from 'src/app/auth/models/provinces.model';
import {Districts} from 'src/app/auth/models/districts.model';
import {Sectors} from 'src/app/auth/models/sectors.model';
import {Cells} from 'src/app/auth/models/cells.model';
import {Villages} from 'src/app/auth/models/villages.model';

import { Subscription } from 'rxjs';

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
	firstrun: any;
	photoUrl: any;

	allSubscriptions: Subscription[] = [];
	provinceSubscription: Subscription = new Subscription();
	discrictSubscription: Subscription = new Subscription();
	sectorSubscription: Subscription = new Subscription();
	cellSubscription: Subscription = new Subscription();

	provinceList: Provinces[] = [];
	districtList: Districts[] = [];


	districtSelect: any;
	sectorSelect: any;
	cellSelect: any;
	villageSelect: any;

	constructor(
		private db: AngularFirestore,
		public usersService: UserService,
		private modalCtrl: ModalController,
		public formBuilder: FormBuilder,
		public router: Router
		) { }

	ngOnInit() {
		// Local storage information
		this.crrntUsr = JSON.parse(window.localStorage.getItem('user'));
		const id = this.crrntUsr.uid;

		this.allSubscriptions.push(this.getProvinces());

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
			province: [''],
			district: [''],
			sector: [''],
			cell: [''],
			village: [''],
		});


		this.allSubscriptions.push(this.province.valueChanges.subscribe((value) => {
			this.selectedProvince();
		}));

		this.allSubscriptions.push(this.district.valueChanges.subscribe((value) => {
			this.selectedDistrict();
		}));

		this.allSubscriptions.push(this.sector.valueChanges.subscribe((value) => {
			this.selectedSector();
		}));

		this.allSubscriptions.push(this.cell.valueChanges.subscribe((value) => {
			this.selectedCell();
		}));

	}

	// Form Getters
	get firstname(){
		return this.editForm.get('firstname');
	}
	get lastname(){
		return this.editForm.get('lastname');
	}
	get phone(){
		return this.editForm.get('phone');
	}
	get accountType(){
		return this.editForm.get('accountType');
	}
	get province(){
		return this.editForm.get('province');
	}
	get district(){
		return this.editForm.get('district');
	}
	get sector(){
		return this.editForm.get('sector');
	}
	get cell(){
		return this.editForm.get('cell');
	}
	get village(){
		return this.editForm.get('village');
	}



	//get all Provinces
	getProvinces(){
		return this.db.collection<Provinces>('provinces', ref => ref.orderBy('id'))
		.valueChanges({ idField: 'id'})
		.subscribe((provinces) => {
			this.provinceList = provinces;
		});
	}

	selectedProvince(){
		this.provinceSubscription.unsubscribe();
		this.provinceSubscription = this.db.collection<Districts>('districts', ref => ref.where('province_id', '==', this.province.value))
		.valueChanges({ idField: 'id'}).subscribe((districts) => {
			this.districtSelect = districts;
		});
	}

	selectedDistrict(){
		this.discrictSubscription.unsubscribe();
		this.discrictSubscription = this.db.collection<Sectors>('sectors', ref => ref.where('district_id', '==', this.district.value))
		.valueChanges({ idField: 'id'}).subscribe((sectors) => {
			this.sectorSelect = sectors;
		});
	}

	selectedSector(){
		this.sectorSubscription.unsubscribe();
		this.sectorSubscription = this.db.collection<Cells>('cells', ref => ref.where('sector_id', '==', this.sector.value))
		.valueChanges({ idField: 'id'}).subscribe((cells) => {
			this.cellSelect = cells;
		});
	}

	selectedCell(){
		this.cellSubscription.unsubscribe();
		this.cellSubscription = this.db.collection<Cells>('villages', ref => ref.where('cell_id', '==', this.cell.value))
		.valueChanges({ idField: 'id'}).subscribe((villages) => {
			this.villageSelect = villages;
		});
	}


	onSubmit() {
		this.crrntUsr = JSON.parse(window.localStorage.getItem('user'));
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
