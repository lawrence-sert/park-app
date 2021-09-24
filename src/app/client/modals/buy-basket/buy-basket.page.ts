import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from "src/app/auth/services/auth.service";
import { UserService } from 'src/app/auth/services/user.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

//basket items
import { BasketService } from 'src/app/client/services/basket.service';
import { Basket } from 'src/app/client/models/basket.model';

import { PaymentMethodsService } from 'src/app/client/modals/services/payment-methods.service';
import { PaymentMethods } from 'src/app/client/modals/models/payment-methods.model';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-buy-basket',
  templateUrl: './buy-basket.page.html',
  styleUrls: ['./buy-basket.page.scss'],
})
export class BuyBasketPage implements OnInit {

	// Data passed in by componentProps
  @Input() pageId: string;

  uid: any;
	crrntUsr: any;
	userRef: any;
	photoURL: any;
	phone: any;

  //form information comes here
	public paymentForm: FormGroup;
	allSubscriptions: Subscription[] = [];
	paymentSubscription: Subscription = new Subscription();

	paymentList: PaymentMethods[] = [];

  constructor(
  		public authService: AuthService,
		public usersService: UserService,
		public formBuilder: FormBuilder,
		private basketService: BasketService,
		public afs: AngularFirestore,
		private modalCtrl : ModalController,
  	) { }

  ngOnInit() {
  	// Local storage information
		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;
		this.usersService.getUserDoc(id).subscribe(res => {
			this.userRef = res;
			this.phone = this.userRef.phone;
		});

		this.paymentForm = this.formBuilder.group({
			method_name: ['']
		});

		this.allSubscriptions.push(this.getPaymentMethod());


		
  }

  get payment_menthod(){
		return this.paymentForm.get('payment_menthod')
	}

	//get all categories
	getPaymentMethod(){
		return this.afs.collection<PaymentMethods>('payment_mthods', ref => ref.orderBy('method_name'))
		.valueChanges({ idField: 'id'})
		.subscribe((payment_mthods) => {
			this.paymentList = payment_mthods
		})
	}

	onSubmit() {
		console.log(this.paymentForm.value);
		this.basketService.payBasket(this.paymentForm.value);
	}

  closeModal() {
		this.modalCtrl.dismiss({
			'dismissed': true
		});
	}

}
