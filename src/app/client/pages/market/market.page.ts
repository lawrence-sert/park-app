import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/model/product.model';

@Component({
  selector: 'app-market',
  templateUrl: './market.page.html',
  styleUrls: ['./market.page.scss'],
})
export class MarketPage implements OnInit {

	uid: any;
  crrntUsr: any;
  userRef: any;
  userEmail: any;
  firstname: any;
  lastname: any;
  displayName: any;
  email: any;
  emailVerified?: boolean;
  photoURL: any;
  accountType?: any;
  firstrun : any;

  products : any;

  type: string;

  constructor(
    public usersService: UserService,
    private productsService: ProductsService
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
      this.photoURL = this.userRef.photoURL;
    });
  }

  ngOnInit() {
    //get segment start
    this.type = 'vegitables';
    //read products 
    this.productsService.getProducts().subscribe((data) => {
      this.products = data.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as {}),
        } as Product;
      });
    });
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

}
